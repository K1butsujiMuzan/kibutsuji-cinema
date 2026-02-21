import { SLUG_REGEXP } from '@/constants/regexp'
import { cors } from '@/lib/routes-helpers/cors'
import { NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'

export const slugCheck = (slug: string): NextResponse | null => {
  const isValid = SLUG_REGEXP.test(slug)
  if (!isValid) {
    return cors(
      NextResponse.json(
        { error: ERRORS.INVALID('slug format') },
        { status: 400 },
      ),
    )
  }
  return null
}
