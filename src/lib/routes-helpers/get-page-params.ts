import type { NextRequest } from 'next/server'

export const getPageParams = (request: NextRequest): [number, number] => {
  const pages =
    Math.max(1, Number(request.nextUrl.searchParams.get('page'))) || 1
  const limit = Math.min(
    20,
    Math.max(1, Number(request.nextUrl.searchParams.get('limit'))) || 10,
  )
  return [pages, limit]
}
