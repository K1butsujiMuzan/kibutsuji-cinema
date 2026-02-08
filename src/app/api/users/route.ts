import { type NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/cors'
import { tokenCheck } from '@/lib/token-check'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { $Enums, type User } from '@/generated/prisma'
import Role = $Enums.Role

export async function GET(request: NextRequest) {
  try {
    const user = tokenCheck(request)

    if (user.role !== Role.MODERATOR && user.role !== Role.ADMIN) {
      return cors(
        NextResponse.json(
          {
            error: ERRORS.INSUFFICIENT_RIGHTS,
          },
          { status: 403 },
        ),
      )
    }
    const pages = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 10

    const users = await prisma.user.findMany({
      skip: (pages - 1) * 10,
      take: limit,
      orderBy: { updatedAt: 'desc' },
    })
    const count = await prisma.user.count()

    return cors(NextResponse.json({ users, count }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = tokenCheck(request)

    if (user.role !== Role.MODERATOR && user.role !== Role.ADMIN) {
      return cors(
        NextResponse.json(
          {
            error: ERRORS.INSUFFICIENT_RIGHTS,
          },
          { status: 403 },
        ),
      )
    }

    const { email, isReceiveNotifications, name, password } =
      await request.json()

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
        name,
        email,
        password,
        isReceiveNotifications,
      },
    })

    return cors(NextResponse.json({ error: null }, { status: 201 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = tokenCheck(request)

    if (user.role !== Role.MODERATOR && user.role !== Role.ADMIN) {
      return cors(
        NextResponse.json(
          {
            error: ERRORS.INSUFFICIENT_RIGHTS,
          },
          { status: 403 },
        ),
      )
    }

    const ids = await request.json()
    if (Array.isArray(ids) && ids.length > 0) {
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
    } else {
      return cors(
        NextResponse.json({ error: ERRORS.TRANSMITTED_DATA }, { status: 400 }),
      )
    }
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = tokenCheck(request)

    if (user.role !== Role.MODERATOR && user.role !== Role.ADMIN) {
      return cors(
        NextResponse.json(
          {
            error: ERRORS.INSUFFICIENT_RIGHTS,
          },
          { status: 403 },
        ),
      )
    }

    const {
      id,
      email,
      name,
      role,
      image,
      isReceiveNotifications,
      emailVerified,
    }: User = await request.json()

    if (user.userId === id && role !== user.role) {
      return cors(
        NextResponse.json({ error: ERRORS.ROLE_YOURSELF }, { status: 403 }),
      )
    }

    const changeUser = await prisma.user.findUnique({ where: { id } })

    if (!changeUser) {
      return cors(
        NextResponse.json({ error: ERRORS.USER_NOT_FOUND }, { status: 404 }),
      )
    }

    if (changeUser.email !== email) {
      const existingUserWithEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUserWithEmail && existingUserWithEmail.email === email) {
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

    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        role,
        image,
        isReceiveNotifications,
        emailVerified,
      },
    })

    return cors(NextResponse.json({ error: null }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
