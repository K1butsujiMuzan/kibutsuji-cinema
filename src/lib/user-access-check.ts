import { tokenCheck } from '@/lib/token-check'
import { Role } from '@/generated/prisma'
import { cors } from '@/lib/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import type { IUserTokenType } from '@/shared/types/user-token.type'

export const userAccessCheck = (
  request: NextRequest,
): { error?: NextResponse; user?: IUserTokenType } => {
  try {
    const user = tokenCheck(request)

    if (user.role === Role.USER) {
      return {
        error: cors(
          NextResponse.json(
            {
              error: ERRORS.INSUFFICIENT_RIGHTS,
            },
            { status: 403 },
          ),
        ),
      }
    }

    return { user }
  } catch (error) {
    return {
      error: cors(
        NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
      ),
    }
  }
}
