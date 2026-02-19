import { type NextRequest } from 'next/server'
import { ERRORS } from '@/constants/errors'
import { verify } from 'jsonwebtoken'
import type { IUserTokenType } from '@/shared/types/user-token.type'

export const tokenCheck = (request: NextRequest): IUserTokenType => {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error(ERRORS.UNAUTHORIZED)
  }

  const token = authHeader?.substring(7)

  try {
    return verify(token, process.env.JWT_SECRET || 'wails-secret-123', {
      issuer: 'kibutsuji-cinema',
      audience: 'wails',
    }) as IUserTokenType
  } catch (error) {
    throw new Error(ERRORS.UNAUTHORIZED)
  }
}
