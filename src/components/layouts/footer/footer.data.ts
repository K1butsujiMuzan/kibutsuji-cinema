import { PAGES } from '@/shared/configs/pages.config'
import type { TFooterLink } from '@/components/layouts/footer/footer.types'

export const footerLinks: TFooterLink[] = [
  {
    name: 'Terms of Use',
    href: PAGES.TOS,
  },
  {
    name: 'FAQ',
    href: PAGES.FAQ,
  },
  {
    name: 'Privacy policy',
    href: PAGES.PRIVACY,
  },
]
