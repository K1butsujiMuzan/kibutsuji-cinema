'use client'

import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import LoginButton from '@/components/ui/login-button/LoginButton'
import LoginPassword from '@/components/ui/login-password/LoginPassword'
import NewPasswordSubmitted from '@/components/widgets/NewPassword/NewPasswordSubmitted'
import { useNewPassword } from '@/components/widgets/NewPassword/useNewPassword'
import { useId } from 'react'

export default function NewPasswordForm() {
  const {
    isSubmitted,
    handleSubmit,
    onFormSubmit,
    errors,
    dirtyFields,
    error,
    isSubmitting,
    isValid,
    register,
  } = useNewPassword()
  const passwordHintId = useId()

  if (isSubmitted) {
    return <NewPasswordSubmitted />
  }

  return (
    <>
      <h1 className={'text-2xl md:text-34 font-semibold text-center'}>
        Create a new password
      </h1>
      <p className={'md:text-18 max-w-104 text-center font-medium'}>
        For security, your password must be 6 or more characters long.
      </p>
      <form
        className={'w-full max-w-104 flex flex-col gap-5'}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className={'flex flex-col gap-8 py-5 md:py-10'}>
          <LoginPassword
            {...register('password')}
            autoComplete={'new-password'}
            maxLength={50}
            isValid={!errors.password?.message}
            isDirty={!!dirtyFields.password}
            labelText={'New password'}
            aria-describedby={passwordHintId}
          />
          <LoginPassword
            {...register('passwordRepeat')}
            autoComplete={'new-password'}
            maxLength={50}
            isValid={!errors.passwordRepeat?.message}
            isDirty={!!dirtyFields.passwordRepeat}
            labelText={'Enter the new password again'}
            aria-describedby={passwordHintId}
          />
          <small className={'text-xs font-medium'} id={passwordHintId}>
            The password must contain at least 6 characters without spaces
          </small>
          {error && <ErrorMessage message={error} />}
        </div>
        <LoginButton
          text={isSubmitting ? 'Reset...' : 'Reset password'}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </>
  )
}
