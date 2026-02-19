import { tokenCheck } from '@/lib/routes-helpers/token-check'
import { Role } from '@/generated/prisma'
import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'
import type { IUserTokenType } from '@/shared/types/user-token.type'

export const userAccessCheck = (
  request: NextRequest,
):
  | { success: false; error: NextResponse }
  | { success: true; user: IUserTokenType } => {
  try {
    const user = tokenCheck(request)

    if (user.role === Role.USER) {
      return {
        success: false,
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

    return { success: true, user }
  } catch (error) {
    return {
      success: false,
      error: cors(
        NextResponse.json({ error: ERRORS.UNAUTHORIZED }, { status: 401 }),
      ),
    }
  }
}
