import Link from 'next/link'
import { PAGES } from '@/configs/pages.config'

export default function RegisterLinks() {
  return (
    <div className={'max-w-104 text-center pt-1 flex flex-col gap-5'}>
      <div className={'text-center text-sm leading-4.5'}>
        <span className={'font-medium'}>Already have an account? </span>
        <Link
          className={
            'font-bold uppercase text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 active:text-gray-700 dark:active:text-gray-100 transition duration-300'
          }
          href={PAGES.LOGIN}
        >
          Log in
        </Link>
      </div>
      <small className={'pt-5 text-xs leading-4 font-semibold'}>
        By creating an account, you agree to our{' '}
        <Link
          className={
            'text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 hover:underline active:text-gray-700 dark:active:text-gray-100 active:underline transition duration-300'
          }
          href={PAGES.TOS}
        >
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link
          className={
            'text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 hover:underline active:text-gray-700 dark:active:text-gray-100 active:underline transition duration-300'
          }
          href={PAGES.PRIVACY}
        >
          Privacy Policy
        </Link>{' '}
        and confirm that you are at least 16 years old.
      </small>
    </div>
  )
}
