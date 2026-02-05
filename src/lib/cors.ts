import type { NextResponse } from 'next/server'

export function cors(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, OPTIONS, DELETE',
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )

  return response
}

//http://wails.localhost:34115
