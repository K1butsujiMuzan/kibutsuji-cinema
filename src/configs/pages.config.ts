import { FRIENDS_PARAMS, type TFriendsType } from '@/configs/friends.config'

export const PAGES = {
  MAIN: '/',
  WELCOME: '/welcome',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET: '/reset-password',
  NEW_PASSWORD: '/new-password',
  TOS: '/tos',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  CATALOG: '/catalog',
  NEWS: '/news',
  USER: (id: string) => `/user/${id}`,
  COMMENTS: (id: string) => `${PAGES.USER(id)}/comments`,
  FRIENDS: (id: string, type?: TFriendsType) => {
    const url = `${PAGES.USER(id)}/friends`
    if (!type) {
      return url
    }
    const params = new URLSearchParams()
    params.set('type', type)
    return `${url}?${params.toString()}`
  },
  SETTINGS: (id: string) => `${PAGES.USER(id)}/settings`,
  NEW_ANIME: '/new-anime',
  ANIME: (slug: string) => `/anime/${slug}`,
  EPISODE: (animeSlug: string, id: string) => `/anime/${animeSlug}/${id}`,
} as const
