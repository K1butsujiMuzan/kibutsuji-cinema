import { LoginGoogleIcon, LoginVKIcon } from '@/ui/login-options/LoginIcons'

export default function LoginOptions() {
  return (
    <div className={'grid w-full grid-cols-1 md:grid-cols-2 gap-2'}>
      <button
        className={
          'flex overflow-hidden gap-1 items-center justify-center text-sm py-1 rounded-md font-medium border border-pink-400 hover:border-pink-450 active:border-pink-500 active:scale-97 transition duration-300'
        }
        type="button"
      >
        <span>Continue with Google</span>
        <LoginGoogleIcon />
      </button>
      <button
        className={
          'flex overflow-hidden gap-1 items-center justify-center text-sm py-1 rounded-md font-medium border border-pink-400 hover:border-pink-450 active:border-pink-500 active:scale-97 transition duration-300'
        }
        type="button"
      >
        <span>Continue with VK</span>
        <LoginVKIcon />
      </button>
    </div>
  )
}
