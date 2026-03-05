import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import prisma from '@/lib/prisma'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import { LikeValue, Prisma } from '@/generated/prisma'
import {
  createLikesSchema,
  updateLikesSchema,
} from '@/shared/schemes/endpoints/likes.schema'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit, search, isSearching] = getPageParams(request)

    const where: Prisma.CommentLikeWhereInput = isSearching
      ? { commentId: { contains: search, mode: 'insensitive' } }
      : {}

    const likes = await prisma.commentLike.findMany({
      where,
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.commentLike.count({ where })

    return cors(NextResponse.json({ data: likes, count }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const idsCheck = await deleteCheck(request)

    if (!idsCheck.success) {
      return idsCheck.error
    }

    const commentsWithDeleteLikes = await prisma.commentLike.findMany({
      where: {
        id: {
          in: idsCheck.ids,
        },
      },
      select: {
        commentId: true,
      },
      distinct: ['commentId'],
    })

    const commentIds = commentsWithDeleteLikes.map((item) => item.commentId)

    await prisma.$transaction(async (tx) => {
      await tx.commentLike.deleteMany({
        where: {
          id: {
            in: idsCheck.ids,
          },
        },
      })

      const groupedLikesByCommentId = await tx.commentLike.groupBy({
        by: ['commentId', 'value'],
        where: {
          commentId: {
            in: commentIds,
          },
        },
        _count: true,
      })

      for (const commentId of commentIds) {
        const commentRating = groupedLikesByCommentId.filter(
          (item) => item.commentId === commentId,
        )
        const commentLikes =
          commentRating.find((item) => item.value === LikeValue.LIKE)?._count ??
          0
        const commentDislikes =
          commentRating.find((item) => item.value === LikeValue.DISLIKE)
            ?._count ?? 0

        await tx.comment.update({
          where: {
            id: commentId,
          },
          data: {
            commentRating: commentLikes - commentDislikes,
          },
        })
      }
    })

    return cors(NextResponse.json({ error: null }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const data = await request.json()

    const parsedData = createLikesSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { value, commentId, userId } = parsedData.data

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!existingComment) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Comment') },
          { status: 404 },
        ),
      )
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      return cors(
        NextResponse.json({ error: ERRORS.NOT_FOUND('User') }, { status: 404 }),
      )
    }

    const existingLike = await prisma.commentLike.findUnique({
      where: {
        commentId_userId: { commentId, userId },
      },
    })

    if (existingLike) {
      return cors(
        NextResponse.json(
          { error: ERRORS.EXISTS('A like with this comment ID and user ID') },
          { status: 409 },
        ),
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.commentLike.create({
        data: {
          commentId,
          userId,
          value,
        },
      })

      await tx.comment.update({
        where: {
          id: commentId,
        },
        data: {
          commentRating:
            value === LikeValue.LIKE ? { increment: 1 } : { decrement: 1 },
        },
      })
    })

    return cors(NextResponse.json({ error: null }, { status: 201 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const data = await request.json()

    const parsedData = updateLikesSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, value } = parsedData.data

    const likeById = await prisma.commentLike.findUnique({ where: { id } })

    if (!likeById) {
      return cors(
        NextResponse.json({ error: ERRORS.NOT_FOUND('Like') }, { status: 404 }),
      )
    }

    if (likeById.value !== value) {
      await prisma.$transaction(async (tx) => {
        await tx.commentLike.update({
          where: {
            id,
          },
          data: {
            value,
          },
        })

        const newValue = value === LikeValue.LIKE ? 2 : -2

        await tx.comment.update({
          where: { id: likeById.commentId },
          data: {
            commentRating: { increment: newValue },
          },
        })
      })
    }

    return cors(NextResponse.json({ error: null }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
