import { type NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'

export const idsCheck = async <T>(
  request: NextRequest,
  type: 'string' | 'number',
): Promise<
  { success: false; error: NextResponse } | { success: true; ids: T[] }
> => {
  const ids = await request.json()

  if (Array.isArray(ids) && ids.length > 0) {
    if (ids.length > 10) {
      return {
        success: false,
        error: cors(
          NextResponse.json(
            { error: ERRORS.DELETE_DATA_LIMIT },
            { status: 400 },
          ),
        ),
      }
    }
    const isCorrectData = ids.every((item) => typeof item === type)
    if (!isCorrectData) {
      return {
        success: false,
        error: cors(
          NextResponse.json(
            { error: ERRORS.TRANSMITTED_DATA },
            { status: 400 },
          ),
        ),
      }
    }
    return { success: true, ids }
  }

  return {
    success: false,
    error: cors(
      NextResponse.json({ error: ERRORS.TRANSMITTED_DATA }, { status: 400 }),
    ),
  }
}
