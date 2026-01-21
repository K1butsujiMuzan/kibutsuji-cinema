'use client'

import LoginInput from '@/components/ui/login-input/LoginInput'
import LoginButton from '@/components/ui/login-button/LoginButton'
import LoginGoogle from '@/components/ui/login-google/LoginGoogle'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { loginScheme, type TLogin } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginPassword from '@/components/ui/login-password/LoginPassword'
import { useState } from 'react'
import { sendVerificationEmail, signIn } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'
import { PAGES } from '@/configs/pages.config'
import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import LoginLinks from '@/components/ui/login-links/LoginLinks'
import LoginSubmitted from '@/components/ui/login-submitted/LoginSubmitted'

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { isValid, errors, dirtyFields, isSubmitting },
  } = useForm<TLogin>({
    resolver: zodResolver(loginScheme),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false)

  const onFormSubmit: SubmitHandler<TLogin> = async (data) => {
    clearErrors('root')
    const response = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: PAGES.MAIN,
    })
    if (response.error) {
      if (response.error?.message === ERRORS.EMAIL_NOT_VERIFIED) {
        const emailVerification = await sendVerificationEmail({
          email: data.email,
          callbackURL: PAGES.MAIN,
        })
        if (emailVerification.error) {
          setError('root', {
            message: emailVerification.error.message || ERRORS.SOMETHING_WRONG,
          })
        } else {
          setIsVerificationSent(true)
        }
      } else {
        setError('root', {
          message: response.error.message || ERRORS.SOMETHING_WRONG,
        })
      }
    }
  }

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
      <h1
        className={
          'text-2xl leading-8 md:text-34 md:leading-11 font-medium text-center'
        }
      >
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={'w-full max-w-104 flex flex-col gap-5'}
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
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <LoginPassword
                {...field}
                autoComplete={'current-password'}
                maxLength={50}
                isValid={!!errors.password?.message}
                isDirty={!!dirtyFields.password}
                labelText={'Password'}
                id={'password'}
              />
            )}
          />
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
        className={'pt-1'}
      />
    </>
  )
}
