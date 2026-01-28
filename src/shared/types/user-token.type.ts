import type { Role } from '@/generated/prisma'

export interface IUserTokenType {
  userId: string
  email: string
  role: Role
  name: string
  iat: number
  exp: number
  aud: string
  iss: string
}
