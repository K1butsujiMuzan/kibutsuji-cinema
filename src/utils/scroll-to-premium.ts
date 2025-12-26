import { WELCOME_PREMIUM_ANCHOR } from '@/app/(guest)/welcome/(components)/welcome.data'

export function onScrollToPremium() {
  const premium = document.getElementById(WELCOME_PREMIUM_ANCHOR)
  premium?.scrollIntoView({ behavior: 'smooth' })
}
