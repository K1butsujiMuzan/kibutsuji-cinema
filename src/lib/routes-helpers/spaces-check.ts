import { cors } from '@/lib/routes-helpers/cors'
import { NextResponse } from 'next/server'
import { ERRORS } from '@/constants/errors'

export const spacesCheck = (
  values: unknown[],
  minLength: number = 3,
):
  | { success: false; error: NextResponse }
  | { success: true; data: string[] } => {
  const isValid = values.every(
    (item): item is string =>
      typeof item === 'string' && item.trim().length >= minLength,
  )
  if (!isValid) {
    return {
      success: false,
      error: cors(
        NextResponse.json(
          { error: ERRORS.MIN_LENGTH(minLength) },
          { status: 400 },
        ),
      ),
    }
  }
  return { success: true, data: values.map((item) => item.trim()) }
}
