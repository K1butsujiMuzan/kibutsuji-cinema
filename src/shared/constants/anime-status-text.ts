import type { AnimeStatus } from '@/generated/prisma'

export const ANIME_STATUS_TEXT: Record<AnimeStatus, string> = {
  ONGOING: 'Ongoing',
  ANNOUNCEMENT: 'Announcement',
  COMPLETED: 'Completed',
}
