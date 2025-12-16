import AuthInput from '@/ui/auth-input/AuthInput'
import Button from '@/ui/button/Button'

export default function WelcomeForm() {
  return (
    <form
      action=""
      className={'flex items-start gap-3 md:gap-4.5 flex-col md:flex-row'}
    >
      <AuthInput
        labelText={'email'}
        id={'email'}
        name={'email'}
        maxLength={50}
        minLength={5}
        type={'email'}
        className={'max-w-60 md:max-w-110'}
      />
      <Button type={'submit'}>Get Started</Button>
    </form>
  )
}
