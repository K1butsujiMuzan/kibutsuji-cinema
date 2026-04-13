import Link from 'next/link'
import { footerLinks } from '@/components/layouts/footer/footer.data'
import MiniLogo from '@/components/ui/logo/MiniLogo'

export default function Footer() {
  return (
    <footer className={'bg-pink-50 dark:bg-gray-800'}>
      <div
        className={
          'max-w-370 mx-auto flex justify-center lg:justify-between items-center p-3 xl:py-4 text-sm text-center'
        }
      >
        <div className={'flex flex-col gap-2.5 xl:gap-1.5'}>
          <div>
            In case of copyright infringement, please contact{' '}
            <a
              className={
                'border-b hover:text-pink-400 hover:dark:text-pink-200 active:text-pink-400 active:dark:text-pink-200 transition duration-300 whitespace-nowrap'
              }
              href={'mailto:information@kibutsuji.me'}
            >
              information@kibutsuji.me
            </a>
          </div>
          <nav>
            <ul
              className={'flex flex-wrap justify-center lg:justify-start gap-4'}
            >
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    className={
                      'border-b whitespace-nowrap hover:text-pink-400 hover:dark:text-pink-200 active:text-pink-400 active:dark:text-pink-200 transition duration-300'
                    }
                    href={link.href}
                  >
                    {link.name}
                  </Link>
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
