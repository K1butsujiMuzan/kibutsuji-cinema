import { PAGES } from '@/configs/links'

interface IFooterLink {
  name: string
  href: string
}

export const footerLinks: IFooterLink[] = [
  {
    name: 'Information',
    href: PAGES.INFO,
  },
  {
    name: 'FAQ',
    href: PAGES.FAQ,
  },
]
