import { cors } from '@/lib/routes-helpers/cors'
import { type NextRequest, NextResponse } from 'next/server'
import { userAccessCheck } from '@/lib/routes-helpers/user-access-check'
import prisma from '@/lib/prisma'
import { ERRORS } from '@/constants/errors'

export async function GET(request: NextRequest) {
  try {
    const access = userAccessCheck(request)

    if (!access.success) {
      return access.error
    }

    const [anime, users, animeEpisodes, comments] = await Promise.all([
      prisma.anime.count(),
      prisma.user.count(),
      prisma.animeEpisode.count(),
      prisma.comment.count(),
    ])

    return cors(
      NextResponse.json(
        [
          {
            label: 'Anime',
            count: anime,
          },
          {
            label: 'Comments',
            count: comments,
          },
          {
            label: 'Episodes',
            count: animeEpisodes,
          },
          {
            label: 'Users',
            count: users,
          },
        ],
        { status: 200 },
      ),
    )
  } catch (error) {
    return cors(
      NextResponse.json({ error: ERRORS.SOMETHING_WRONG }, { status: 500 }),
    )
  }
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}
