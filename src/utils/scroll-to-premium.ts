import { WELCOME_PREMIUM_ANCHOR } from '@/components/widgets/welcome/welcome.data'

export function onScrollToPremium() {
  const premium = document.getElementById(WELCOME_PREMIUM_ANCHOR)
  premium?.scrollIntoView({ behavior: 'smooth' })
}
