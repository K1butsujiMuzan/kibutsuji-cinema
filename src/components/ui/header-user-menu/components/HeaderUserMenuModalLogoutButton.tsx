'use client'

import { useTransition } from 'react'
import { signOut } from '@/lib/auth-client'
import { PAGES } from '@/configs/pages.config'
import { useRouter } from 'next/navigation'
import { memo } from 'react'

export default memo(function HeaderUserMenuModalLogoutButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const onLogout = () => {
    startTransition(async () => {
      try {
        const result = await signOut()
        if (result.data && result.data.success) {
          router.replace(PAGES.WELCOME)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <button
      aria-label={'change theme'}
      disabled={isPending}
      onClick={onLogout}
      type={'button'}
      className={
        'w-full disabled:cursor-not-allowed! flex items-center overflow-hidden gap-2 px-3.5 py-2 rounded-sm hover:bg-pink-70 dark:hover:bg-gray-500 active:bg-pink-70 dark:active:bg-gray-500 transition duration-300'
      }
    >
      <svg
        className={'shrink-0 text-red-300 dark:text-red-200'}
        aria-hidden={true}
        role={'img'}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.66667 14C8.66667 14.1768 8.59643 14.3464 8.4714 14.4714C8.34638 14.5964 8.17681 14.6666 8 14.6666H5.33333C4.4496 14.6656 3.60237 14.3141 2.97748 13.6892C2.35259 13.0643 2.00106 12.217 2 11.3333V4.66665C2.00106 3.78292 2.35259 2.93568 2.97748 2.31079C3.60237 1.6859 4.4496 1.33437 5.33333 1.33331H8C8.17681 1.33331 8.34638 1.40355 8.4714 1.52858C8.59643 1.6536 8.66667 1.82317 8.66667 1.99998C8.66667 2.17679 8.59643 2.34636 8.4714 2.47138C8.34638 2.59641 8.17681 2.66665 8 2.66665H5.33333C4.8029 2.66665 4.29419 2.87736 3.91912 3.25243C3.54405 3.62751 3.33333 4.13621 3.33333 4.66665V11.3333C3.33333 11.8637 3.54405 12.3725 3.91912 12.7475C4.29419 13.1226 4.8029 13.3333 5.33333 13.3333H8C8.17681 13.3333 8.34638 13.4035 8.4714 13.5286C8.59643 13.6536 8.66667 13.8232 8.66667 14ZM13.8047 7.52865L11.138 4.86198C11.0765 4.79831 11.0029 4.74752 10.9216 4.71258C10.8403 4.67764 10.7528 4.65925 10.6643 4.65848C10.5757 4.65771 10.488 4.67458 10.406 4.7081C10.3241 4.74162 10.2497 4.79112 10.1871 4.85372C10.1245 4.91631 10.075 4.99075 10.0415 5.07268C10.0079 5.15461 9.99106 5.24239 9.99183 5.33091C9.9926 5.41943 10.011 5.50691 10.0459 5.58825C10.0809 5.66958 10.1317 5.74315 10.1953 5.80465L11.724 7.33331H6.66667C6.48986 7.33331 6.32029 7.40355 6.19526 7.52857C6.07024 7.6536 6 7.82317 6 7.99998C6 8.17679 6.07024 8.34636 6.19526 8.47138C6.32029 8.59641 6.48986 8.66665 6.66667 8.66665H11.724L10.1953 10.1953C10.1317 10.2568 10.0809 10.3304 10.0459 10.4117C10.011 10.493 9.9926 10.5805 9.99183 10.669C9.99106 10.7576 10.0079 10.8454 10.0415 10.9273C10.075 11.0092 10.1245 11.0836 10.1871 11.1462C10.2497 11.2088 10.3241 11.2583 10.406 11.2919C10.488 11.3254 10.5757 11.3422 10.6643 11.3415C10.7528 11.3407 10.8403 11.3223 10.9216 11.2874C11.0029 11.2524 11.0765 11.2017 11.138 11.138L13.8047 8.47131C13.9296 8.34629 13.9999 8.17676 13.9999 7.99998C13.9999 7.8232 13.9296 7.65366 13.8047 7.52865Z"
          fill="black"
        />
      </svg>
      <span className={'overflow-hidden text-nowrap text-ellipsis font-medium'}>
        {isPending ? 'Logging out...' : 'Log out'}
      </span>
    </button>
  )
})
