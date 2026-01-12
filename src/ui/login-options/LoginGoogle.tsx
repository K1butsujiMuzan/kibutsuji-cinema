'use client'

import { LoginGoogleIcon } from '@/ui/login-options/LoginIcons'

interface Props {
  onLoginGoogleClick: () => void
}

export default function LoginGoogle({ onLoginGoogleClick }: Props) {
  return (
    <button
      onClick={onLoginGoogleClick}
      className={
        'flex overflow-hidden gap-1 items-center justify-center text-sm py-1 rounded-md font-medium border border-pink-400 hover:border-pink-450 active:border-pink-500 active:scale-97 transition duration-300'
      }
      type="button"
    >
      <span>Continue with Google</span>
      <LoginGoogleIcon />
    </button>
  )
}
