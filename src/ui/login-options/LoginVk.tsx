import { LoginVKIcon } from '@/ui/login-options/LoginIcons'

export default function LoginVk() {
  return (
    <button
      className={
        'flex overflow-hidden gap-1 items-center justify-center text-sm py-1 rounded-md font-medium border border-pink-400 hover:border-pink-450 active:border-pink-500 active:scale-97 transition duration-300'
      }
      type="button"
    >
      <span>Continue with VK</span>
      <LoginVKIcon />
    </button>
  )
}
