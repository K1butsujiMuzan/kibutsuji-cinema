const baseurl = process.env.NEXT_PUBLIC_URL ?? ''

export const API_ENDPOINTS = {
  POPULAR_ANIME: `${baseurl}/popular-anime`,
} as const
