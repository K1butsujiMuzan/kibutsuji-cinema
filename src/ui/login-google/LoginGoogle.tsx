'use client'

import { signIn } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'
import { useState } from 'react'
import { PAGES } from '@/configs/pages.config'

export default function LoginGoogle() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onLoginGoogleClick = async () => {
    try {
      setIsLoading(true)
      const response = await signIn.social({
        provider: 'google',
        callbackURL: PAGES.MAIN,
      })
      if (response.error) {
        console.error(response.error.message || ERRORS.SOMETHING_WRONG)
      }
    } catch (error) {
      console.error(ERRORS.PROVIDER_FAILED, error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={onLoginGoogleClick}
      className={
        'flex overflow-hidden gap-1 items-center justify-center text-sm py-1 px-1 rounded-md font-medium border disabled:text-gray-200 disabled:border-gray-200 disabled:!cursor-default border-pink-400 hover:border-pink-450 active:border-pink-500 not-disabled:active:scale-97 transition duration-300'
      }
      type="button"
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      <span>Continue with Google</span>
      <svg
        className={'shrink-0'}
        role={'img'}
        aria-hidden={true}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2781_1337)">
          <path
            d="M12.3501 10.25V14.05H17.8001C17.4744 15.2328 16.7593 16.2712 15.7702 16.9971C14.7812 17.723 13.5761 18.094 12.3501 18.05C11.3761 18.0467 10.4173 17.8083 9.55514 17.3551C8.69301 16.9018 7.95306 16.2472 7.39818 15.4467C6.84329 14.6462 6.48988 13.7235 6.36798 12.7572C6.24608 11.7909 6.35929 10.8094 6.69799 9.89615C7.0367 8.98294 7.59088 8.165 8.31343 7.51186C9.03599 6.85872 9.90556 6.38969 10.8482 6.14463C11.7909 5.89957 12.7788 5.88573 13.728 6.10428C14.6771 6.32284 15.5595 6.76733 16.3001 7.39997L19.1001 4.59997C17.8988 3.50811 16.4498 2.72511 14.8782 2.31861C13.3065 1.91211 11.6596 1.89432 10.0796 2.26678C8.49955 2.63925 7.03395 3.39077 5.80938 4.45643C4.58481 5.52209 3.63808 6.86985 3.05097 8.3833C2.46385 9.89674 2.25401 11.5304 2.43957 13.1431C2.62512 14.7557 3.2005 16.299 4.11599 17.6396C5.03148 18.9801 6.25956 20.0777 7.69416 20.8374C9.12876 21.5971 10.7267 21.9961 12.3501 22C20.7501 22 22.6001 14.15 21.8001 10.25H12.3501Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2781_1337">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}
