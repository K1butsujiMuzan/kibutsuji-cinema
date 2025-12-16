import Socials from '@/ui/socials/Socials'
import { footerLinks } from '@/layout/footer/footer.data'
import Link from 'next/link'
import UploadSocials from '@/ui/upload-socials/UploadSocials'
import Logo from '@/ui/logo/Logo'

export default function Footer() {
  return (
    <footer className={'bg-pink-50 dark:bg-gray-750'}>
      <div
        className={
          'container mx-auto flex flex-col items-center gap-5 md:gap-12 py-5 md:py-12 px-4'
        }
      >
        <Socials />
        <div
          className={'flex gap-y-2 gap-x-6 md:gap-12 flex-wrap justify-center'}
        >
          {footerLinks.map((link) => (
            <Link
              className={
                'whitespace-nowrap hover:text-pink-400 hover:dark:text-pink-200 text-base md:text-18 transition duration-300'
              }
              href={link.href}
              key={link.text}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <UploadSocials />
        <div className={'flex justify-end w-full'}>
          <Logo />
        </div>
      </div>
    </footer>
  )
}
