import { PAGES } from '@/configs/links'

interface IFooterLink {
  name: string
  href: string
}

export const footerLinks: IFooterLink[] = [
  {
    name: 'Terms of Use',
    href: PAGES.TOS,
  },
  {
    name: 'FAQ',
    href: PAGES.FAQ,
  },
]
