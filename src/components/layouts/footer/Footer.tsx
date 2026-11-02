import { footerLinks } from '@/components/layouts/footer/footer.data'
import MiniLogo from '@/components/ui/logo/MiniLogo'
import { LINKS } from '@/shared/configs/links.config'
import TextLink from '@/components/ui/text-link/TextLink'

export default function Footer() {
  return (
    <footer className={'bg-base-second-bg'}>
      <div
        className={
          'max-w-370 mx-auto flex justify-center lg:justify-between items-center p-3 xl:py-4 text-sm text-center'
        }
      >
        <div className={'flex flex-col gap-2.5 xl:gap-1.5'}>
          <div>
            In case of copyright infringement, please contact{' '}
            <TextLink type={'a'} href={LINKS.EMAIL_INFO.href}>
              {LINKS.EMAIL_INFO.label}
            </TextLink>
          </div>
          <nav>
            <ul
              className={
                'flex flex-wrap justify-center lg:justify-start gap-2.5'
              }
            >
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <TextLink type={'link'} href={link.href}>
                    {link.name}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={'hidden lg:flex'}>
          <MiniLogo />
        </div>
      </div>
    </footer>
  )
}
