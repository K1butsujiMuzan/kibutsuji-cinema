'use client'

import LoginInput from '@/components/ui/login-input/LoginInput'
import LoginButton from '@/components/ui/login-button/LoginButton'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { resetScheme, type TReset } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import { requestPasswordReset } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'
import { PAGES } from '@/configs/pages.config'
import LoginLinks from '@/components/ui/login-links/LoginLinks'
import LoginSubmitted from '@/components/ui/login-submitted/LoginSubmitted'
import ResetTitle
  from "@/app/(guest)/(account)/reset-password/(components)/ResetTitle";

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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onFormSubmit: SubmitHandler<TReset> = async (data) => {
    setError(null)
    const response = await requestPasswordReset({
      email: data.email,
      redirectTo: `${window.location.origin}/${PAGES.NEW_PASSWORD}`,
    })
    if (response.error) {
      setError(response.error.message || ERRORS.SOMETHING_WRONG)
    } else {
      setIsSubmitted(true)
    }
  }

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
      <ResetTitle />
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
                autoComplete={'email'}
                isValid={!!errors.email?.message}
                labelText={'Email'}
                id={'email'}
                type={'email'}
              />
            )}
          />
          {error && (
            <ErrorMessage message={error} />
          )}
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
