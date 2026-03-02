import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import prisma from '@/lib/prisma'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'
import {
  createCommentsSchema,
  updateCommentsSchema,
} from '@/shared/schemes/endpoints/comments.schema'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

    const comments = await prisma.comment.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.comment.count()

    return cors(NextResponse.json({ comments, count }, { status: 200 }))
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

    await prisma.comment.deleteMany({
      where: {
        id: {
          in: idsCheck.ids,
        },
      },
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

    const parsedData = createCommentsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { episodeId, userId, text } = parsedData.data

    const existingEpisode = await prisma.animeEpisode.findUnique({
      where: { id: episodeId },
    })

    if (!existingEpisode) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Episode') },
          { status: 404 },
        ),
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { id: userId } })

    if (!existingUser) {
      return cors(
        NextResponse.json({ error: ERRORS.NOT_FOUND('User') }, { status: 404 }),
      )
    }

    await prisma.comment.create({
      data: {
        episodeId,
        userId,
        text,
      },
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

    const parsedData = updateCommentsSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { id, text } = parsedData.data

    const commentById = await prisma.comment.findUnique({ where: { id } })

    if (!commentById) {
      return cors(
        NextResponse.json(
          { error: ERRORS.NOT_FOUND('Comment') },
          { status: 404 },
        ),
      )
    }

    await prisma.comment.update({
      where: { id },
      data: { text },
    })

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
