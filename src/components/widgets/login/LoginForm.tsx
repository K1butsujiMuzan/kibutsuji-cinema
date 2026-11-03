'use client'

import LoginInput from '@/components/ui/login-input/LoginInput'
import LoginButton from '@/components/ui/login-button/LoginButton'
import LoginGoogle from '@/components/ui/login-google/LoginGoogle'
import LoginPassword from '@/components/ui/login-password/LoginPassword'
import { PAGES } from '@/shared/configs/pages.config'
import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import LoginLinks from '@/components/ui/login-links/LoginLinks'
import LoginSubmitted from '@/components/ui/login-submitted/LoginSubmitted'
import { useLoginForm } from '@/components/widgets/login/useLoginForm'

export default function LoginForm() {
  const {
    isVerificationSent,
    getValues,
    handleSubmit,
    onFormSubmit,
    isSubmitting,
    isValid,
    errors,
    error,
    dirtyFields,
    register,
  } = useLoginForm()

  if (isVerificationSent) {
    return (
      <LoginSubmitted
        email={getValues('email')}
        text={'Email confirmation link sent'}
      />
    )
  }

  return (
    <>
      <h1 className={'text-2xl md:text-34 font-semibold text-center'}>Login</h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={'w-full max-w-104 flex flex-col gap-5'}
      >
        <div className={'flex flex-col gap-4 py-5 md:py-10'}>
          <LoginInput
            {...register('email')}
            autoComplete={'email'}
            isValid={!errors.email?.message}
            labelText={'Email'}
            type={'email'}
          />
          <LoginPassword
            {...register('password')}
            autoComplete={'current-password'}
            maxLength={50}
            isValid={!errors.password?.message}
            isDirty={!!dirtyFields.password}
            labelText={'Password'}
          />
          {error && <ErrorMessage message={error} />}
        </div>
        <LoginGoogle />
        <LoginButton
          text={isSubmitting ? 'Logging in...' : 'Login'}
          disabled={!isValid || isSubmitting}
        />
      </form>
      <LoginLinks
        firstHref={PAGES.RESET}
        firstText={'Forgot your password?'}
        secondHref={PAGES.REGISTER}
        secondText={'Create an Account'}
      />
    </>
  )
}
