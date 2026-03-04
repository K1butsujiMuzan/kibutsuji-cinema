import { type NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { Prisma, Role } from '@/generated/prisma'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { nullTransform } from '@/lib/routes-helpers/null-transform'
import {
  createUsersSchema,
  updateUsersSchema,
} from '@/shared/schemes/endpoints/users.schema'
import { deleteCheck } from '@/lib/routes-helpers/delete-check'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit, search, isSearching] = getPageParams(request)

    const where: Prisma.UserWhereInput = isSearching
      ? { email: { contains: search, mode: 'insensitive' } }
      : {}

    const users = await prisma.user.findMany({
      where,
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.user.count({ where })

    return cors(NextResponse.json({ users, count }, { status: 200 }))
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

    const { ids, user } = idsCheck

    if (ids.includes(user.userId)) {
      return cors(
        NextResponse.json({ error: ERRORS.DELETE_YOURSELF }, { status: 403 }),
      )
    }

    const deleteUsers = await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    if (
      (user.role === Role.MODERATOR &&
        deleteUsers.some(
          (item) => item.role === Role.MODERATOR || item.role === Role.ADMIN,
        )) ||
      (user.role === Role.ADMIN &&
        deleteUsers.some((item) => item.role === Role.ADMIN))
    ) {
      return cors(
        NextResponse.json(
          { error: ERRORS.INSUFFICIENT_RIGHTS },
          { status: 403 },
        ),
      )
    }

    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
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

    const parsedData = createUsersSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const { email, isReceiveNotifications, name, password } = parsedData.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return cors(
        NextResponse.json({ error: ERRORS.USER_EXISTS }, { status: 409 }),
      )
    }

    await auth.api.signUpEmail({
      body: {
        isReceiveNotifications,
        name,
        email,
        password,
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

    const { user } = access

    const data = await request.json()

    const parsedData = updateUsersSchema.safeParse(data)

    if (!parsedData.success) {
      return cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      )
    }

    const {
      id,
      email,
      emailVerified,
      name,
      isReceiveNotifications,
      role,
      image,
    } = parsedData.data

    if (user.userId === id && role !== user.role) {
      return cors(
        NextResponse.json({ error: ERRORS.ROLE_YOURSELF }, { status: 403 }),
      )
    }

    const changeUser = await prisma.user.findUnique({ where: { id } })

    if (!changeUser) {
      return cors(
        NextResponse.json({ error: ERRORS.NOT_FOUND('User') }, { status: 404 }),
      )
    }

    if (changeUser.email !== email) {
      const existingUserWithEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUserWithEmail) {
        return cors(
          NextResponse.json({ error: ERRORS.USER_EXISTS }, { status: 409 }),
        )
      }
    }

    if (
      (user.role === Role.MODERATOR &&
        (changeUser.role === Role.MODERATOR ||
          changeUser.role === Role.ADMIN) &&
        user.userId !== changeUser.id) ||
      (user.role === Role.ADMIN &&
        changeUser.role === Role.ADMIN &&
        changeUser.id !== user.userId) ||
      (user.role === Role.MODERATOR && changeUser.role !== role) ||
      (user.role === Role.ADMIN &&
        role === Role.ADMIN &&
        changeUser.id !== user.userId)
    ) {
      return cors(
        NextResponse.json(
          { error: ERRORS.INSUFFICIENT_RIGHTS },
          { status: 403 },
        ),
      )
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
        isReceiveNotifications,
        emailVerified,
        name,
        email,
        image: nullTransform(image),
      },
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
