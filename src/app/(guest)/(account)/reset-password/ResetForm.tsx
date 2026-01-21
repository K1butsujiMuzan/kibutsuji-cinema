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

export default function ResetForm() {
  const {
    control,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, errors, isSubmitting },
  } = useForm<TReset>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(resetScheme),
  })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const onFormSubmit: SubmitHandler<TReset> = async (data) => {
    clearErrors('root')
    const response = await requestPasswordReset({
      email: data.email,
      redirectTo: `${window.location.origin}/${PAGES.NEW_PASSWORD}`,
    })
    if (response.error) {
      setError('root', {
        message: response.error.message || ERRORS.SOMETHING_WRONG,
      })
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
                autoComplete={'email'}
                isValid={!!errors.email?.message}
                labelText={'Email'}
                id={'email'}
                type={'email'}
              />
            )}
          />
          {errors.root?.message && (
            <ErrorMessage message={errors.root.message} />
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
