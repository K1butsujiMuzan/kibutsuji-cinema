import { type NextRequest, NextResponse } from 'next/server'
import { reportSchema } from '@/shared/schemes/endpoints/report.schema'
import { cors } from '@/lib/routes-helpers/cors'
import { ERRORS } from '@/constants/errors'

export const getReportParams = (
  request: NextRequest,
):
  | { success: false; error: NextResponse }
  | {
      success: true
      data: { fromDate: Date; toDate: Date; limit: number }
    } => {
  const parsedData = reportSchema.safeParse({
    fromDate: request.nextUrl.searchParams.get('from-date'),
    toDate: request.nextUrl.searchParams.get('to-date'),
    limit: Number(request.nextUrl.searchParams.get('limit')) || 10,
  })

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

  if (parsedData.data.fromDate.getTime() > parsedData.data.toDate.getTime()) {
    return {
      success: false,
      error: cors(
        NextResponse.json({ error: ERRORS.INVALID_TO_DATE }, { status: 400 }),
      ),
    }
  }

  return { success: true, data: parsedData.data }
}
