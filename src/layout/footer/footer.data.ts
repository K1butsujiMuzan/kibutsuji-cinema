import { PAGES } from '@/configs/links'

interface IFooterLink {
  text: string
  href: string
}

export const footerLinks: IFooterLink[] = [
  {
    text: 'Home',
    href: PAGES.MAIN,
  },
  {
    text: 'Info',
    href: PAGES.INFO,
  },
  {
    text: 'Contact us',
    href: PAGES.CONTACTS,
  },
  {
    text: 'FAQ',
    href: PAGES.FAQ,
  },
  {
    text: 'Account',
    href: PAGES.PROFILE,
  },
]
