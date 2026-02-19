import { type NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { type User, Role } from '@/generated/prisma'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { getPageParams } from '@/lib/routes-helpers/get-page-params'
import { idsCheck } from '@/lib/routes-helpers/ids-check'
import { spacesCheck } from '@/lib/routes-helpers/spaces-check'
import { nullTransform } from '@/lib/routes-helpers/null-transform'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [pages, limit] = getPageParams(request)

    const users = await prisma.user.findMany({
      skip: (pages - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.user.count()

    return cors(NextResponse.json({ users, count }, { status: 200 }))
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const { user } = access

    const checkedData = await idsCheck<string>(request, 'string')

    if (!checkedData.success) {
      return checkedData.error
    }

    const { ids } = checkedData

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

    const {
      email,
      isReceiveNotifications,
      name,
      password,
    }: Pick<User, 'email' | 'isReceiveNotifications' | 'name'> & {
      password: string
    } = await request.json()

    const trimNameCheck = spacesCheck([name])
    const trimCheck = spacesCheck([email, password], 6)

    if (!trimNameCheck.success) {
      return trimNameCheck.error
    }

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedName] = trimNameCheck.data
    const [trimmedEmail, trimmedPassword] = trimCheck.data

    const existingUser = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    })

    if (existingUser) {
      return cors(
        NextResponse.json({ error: ERRORS.USER_EXISTS }, { status: 409 }),
      )
    }

    await auth.api.signUpEmail({
      body: {
        isReceiveNotifications,
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
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

    const {
      id,
      email,
      name,
      role,
      image,
      isReceiveNotifications,
      emailVerified,
    }: Omit<User, 'createdAt' | 'updatedAt'> = await request.json()

    const trimNameCheck = spacesCheck([name])
    const trimCheck = spacesCheck([email], 6)

    if (!trimNameCheck.success) {
      return trimNameCheck.error
    }

    if (!trimCheck.success) {
      return trimCheck.error
    }

    const [trimmedName] = trimNameCheck.data
    const [trimmedEmail] = trimCheck.data

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

    if (changeUser.email !== trimmedEmail) {
      const existingUserWithEmail = await prisma.user.findUnique({
        where: { email: trimmedEmail },
      })

      if (
        existingUserWithEmail &&
        existingUserWithEmail.email === trimmedEmail
      ) {
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
        name: trimmedName,
        email: trimmedEmail,
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
