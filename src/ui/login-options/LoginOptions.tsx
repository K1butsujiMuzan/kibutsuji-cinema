import LoginGoogle from '@/ui/login-options/LoginGoogle'
import LoginVk from '@/ui/login-options/LoginVk'
import { LOGIN_OPTIONS } from '@/ui/login-options/login-options.data'
import { signIn } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'

const onLoginGoogleClick = async (provider: string) => {
  try {
    const response = await signIn.social({
      provider,
    })
    if (response.error) {
      console.error(response.error.message || ERRORS.SOMETHING_WRONG)
    }
  } catch (error) {
    console.error(ERRORS.PROVIDER_FAILED, error)
  }
}

export default function LoginOptions() {
  return (
    <div className={'grid w-full grid-cols-1 md:grid-cols-2 gap-2'}>
      <LoginGoogle
        onLoginGoogleClick={() => onLoginGoogleClick(LOGIN_OPTIONS.GOOGLE)}
      />
      <LoginVk />
    </div>
  )
}
