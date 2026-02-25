import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import { deleteIdsSchema } from '@/shared/schemes/endpoints/delete-ids.schema'
import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import type { IUserTokenType } from '@/shared/types/user-token.type'

export const deleteCheck = async (
  request: NextRequest,
): Promise<
  | { success: false; error: NextResponse }
  | { success: true; ids: string[]; user: IUserTokenType }
> => {
  const access = userAccessCheck(request)

  if (!access.success) {
    return { success: false, error: access.error }
  }

  const data = await request.json()

  const parsedData = deleteIdsSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      error: cors(
        NextResponse.json(
          { error: parsedData.error.issues[0].message },
          { status: 400 },
        ),
      ),
    }
  }

  return { success: true, ids: parsedData.data, user: access.user }
}
