import type { NextResponse } from 'next/server'

export function cors(response: NextResponse) {
  response.headers.set(
    'Access-Control-Allow-Origin',
    'http://wails.localhost:34115',
  )
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )

  return response
}
