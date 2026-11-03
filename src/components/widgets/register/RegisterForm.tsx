'use client'

import LoginInput from '@/components/ui/login-input/LoginInput'
import LoginButton from '@/components/ui/login-button/LoginButton'
import LoginGoogle from '@/components/ui/login-google/LoginGoogle'
import LoginCheckbox from '@/components/ui/login-checkbox/LoginCheckbox'
import LoginPassword from '@/components/ui/login-password/LoginPassword'
import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import RegisterLinks from '@/components/widgets/register/RegisterLinks'
import LoginSubmitted from '@/components/ui/login-submitted/LoginSubmitted'
import { useRegisterForm } from '@/components/widgets/register/useRegisterForm'
import { useId } from 'react'

export default function RegisterForm() {
  const passwordHintId = useId()
  const {
    isSubmitted,
    getValues,
    handleSubmit,
    onFormSubmit,
    isSubmitting,
    isValid,
    errors,
    dirtyFields,
    error,
    register,
  } = useRegisterForm()

  if (isSubmitted) {
    return (
      <LoginSubmitted
        email={getValues('email')}
        text={'Email confirmation link sent'}
      />
    )
  }

  return (
    <>
      <h1 className={'text-2xl md:text-34 font-semibold text-center'}>
        Create an account
      </h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={'w-full max-w-104 flex flex-col gap-5'}
      >
        <div className={'flex flex-col gap-4 py-5 md:py-10'}>
          <LoginInput
            {...register('email')}
            isValid={!errors.email?.message}
            autoComplete={'email'}
            labelText={'Email'}
            type={'email'}
          />
          <LoginPassword
            {...register('password')}
            autoComplete={'new-password'}
            maxLength={50}
            isValid={!errors.password?.message}
            labelText={'Password'}
            isDirty={!!dirtyFields.password}
            aria-describedby={passwordHintId}
          />
          <small id={passwordHintId} className={'text-xs py-1'}>
            The password must contain at least 6 characters without spaces
          </small>
          <LoginCheckbox {...register('isReceiveNotifications')}>
            Send me Kibutsuji news and offers.
          </LoginCheckbox>
          {error && <ErrorMessage message={error} />}
        </div>
        <LoginGoogle />
        <LoginButton
          text={isSubmitting ? 'Creating...' : 'Create an Account'}
          disabled={!isValid || isSubmitting}
        />
      </form>
      <RegisterLinks />
    </>
  )
}
