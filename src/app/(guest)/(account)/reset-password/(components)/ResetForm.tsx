'use client'

import LoginInput from '@/ui/login-input/LoginInput'
import LoginButton from '@/ui/login-button/LoginButton'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { resetScheme, type TReset } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ErrorMessage from '@/ui/error-message/ErrorMessage'
import { requestPasswordReset } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'
import { PAGES } from '@/configs/pages.config'
import LoginLinks from '@/ui/login-links/LoginLinks'
import ResetSubmitted from '@/app/(guest)/(account)/reset-password/(components)/ResetSubmitted'

export default function ResetForm() {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<TReset>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(resetScheme),
  })
  const [resetError, setResetError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const onFormSubmit: SubmitHandler<TReset> = async (data) => {
    setResetError(null)
    const response = await requestPasswordReset({
      email: data.email,
      redirectTo: `${window.location.origin}/${PAGES.NEW_PASSWORD}`,
    })
    if (response.error) {
      setResetError(response.error.message || ERRORS.SOMETHING_WRONG)
    } else {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return <ResetSubmitted email={getValues('email')} />
  }

  return (
    <>
      <h1
        className={
          'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-3 md:mb-5 text-center'
        }
      >
        Reset password
      </h1>
      <p
        className={
          'text-sm leading-4.5 md:leading-6 md:text-base max-w-104 text-center font-medium mb-5'
        }
      >
        A password reset link will be sent to your email. Your IP address may be
        logged for security purposes.
      </p>
      <form
        className={'w-full max-w-104 flex flex-col gap-5'}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className={'flex flex-col gap-4 py-5 md:py-10'}>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                isValid={!!errors.email?.message}
                labelText={'Email'}
                id={'email'}
                type={'email'}
              />
            )}
          />
          {resetError && <ErrorMessage message={resetError} />}
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
