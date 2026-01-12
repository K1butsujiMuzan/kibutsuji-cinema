'use client'

import LoginInput from '@/ui/login-input/LoginInput'
import LoginButton from '@/ui/login-button/LoginButton'
import LoginOptions from '@/ui/login-options/LoginOptions'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { loginScheme, type TLogin } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginPassword from '@/ui/login-password/LoginPassword'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendVerificationEmail, signIn } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'
import { PAGES } from '@/configs/pages.config'
import ErrorMessage from '@/ui/error-message/ErrorMessage'
import LoginLinks from '@/ui/login-links/LoginLinks'
import LoginSubmitted from '@/ui/login-submitted/LoginSubmitted'

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors, dirtyFields, isSubmitting },
  } = useForm<TLogin>({
    resolver: zodResolver(loginScheme),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false)

  const onFormSubmit: SubmitHandler<TLogin> = async (data) => {
    setLoginError(null)
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
          setLoginError(
            emailVerification.error.message || ERRORS.SOMETHING_WRONG,
          )
        } else {
          setIsVerificationSent(true)
        }
      } else {
        setLoginError(response.error.message || ERRORS.SOMETHING_WRONG)
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
                isValid={!!errors.email?.message}
                labelText={'Email'}
                id={'email'}
                type={'email'}
              />
            )}
          />
          {loginError && <ErrorMessage message={loginError} />}
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <LoginPassword
                {...field}
                isValid={!!errors.password?.message}
                isDirty={!!dirtyFields.password}
                labelText={'Password'}
                id={'password'}
              />
            )}
          />
        </div>
        <LoginOptions />
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
