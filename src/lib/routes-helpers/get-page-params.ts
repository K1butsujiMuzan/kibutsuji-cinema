import type { NextRequest } from 'next/server'

export const getPageParams = (request: NextRequest): [number, number] => {
  const pages = Number(request.nextUrl.searchParams.get('page')) || 1
  const limit = Number(request.nextUrl.searchParams.get('limit')) || 10
  return [pages, limit]
}
