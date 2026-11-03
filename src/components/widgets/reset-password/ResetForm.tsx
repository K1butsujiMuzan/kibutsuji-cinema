'use client'

import LoginInput from '@/components/ui/login-input/LoginInput'
import LoginButton from '@/components/ui/login-button/LoginButton'
import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import { PAGES } from '@/shared/configs/pages.config'
import LoginLinks from '@/components/ui/login-links/LoginLinks'
import LoginSubmitted from '@/components/ui/login-submitted/LoginSubmitted'
import { useResetPassword } from '@/components/widgets/reset-password/useResetPassword'

export default function ResetForm() {
  const {
    isSubmitted,
    getValues,
    handleSubmit,
    onFormSubmit,
    errors,
    error,
    isSubmitting,
    isValid,
    register,
  } = useResetPassword()

  if (isSubmitted) {
    return (
      <LoginSubmitted
        email={getValues('email')}
        text={'Password reset link sent'}
      />
    )
  }

  return (
    <>
      <h1 className={'text-2xl md:text-34 font-semibold text-center'}>
        Reset password
      </h1>
      <p className={'md:text-18 max-w-104 text-center font-medium'}>
        A password reset link will be sent to your email. Your IP address may be
        logged for security purposes.
      </p>
      <form
        className={'w-full max-w-104 flex flex-col gap-5'}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className={'flex flex-col gap-4 py-5 md:py-10'}>
          <LoginInput
            {...register('email')}
            autoComplete={'email'}
            isValid={!errors.email?.message}
            labelText={'Email'}
            type={'email'}
          />
          {error && <ErrorMessage message={error} />}
        </div>
        <LoginButton
          text={isSubmitting ? 'Sending...' : 'Send'}
          disabled={!isValid || isSubmitting}
        />
      </form>
      <LoginLinks
        firstHref={PAGES.LOGIN}
        firstText={'Login'}
        secondHref={PAGES.REGISTER}
        secondText={'Create an Account'}
      />
    </>
  )
}
