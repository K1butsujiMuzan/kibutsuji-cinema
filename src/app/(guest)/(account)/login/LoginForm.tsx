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
import { signIn } from '@/lib/auth-client'
import { ERRORS } from '@/constants/errors'
import { PAGES } from '@/configs/pages.config'
import ErrorMessage from '@/ui/error-message/ErrorMessage'

export default function LoginForm() {
  const {
    control,
    handleSubmit,
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
  const router = useRouter()

  const onFormSubmit: SubmitHandler<TLogin> = async (data) => {
    setLoginError(null)
    const response = await signIn.email({
      email: data.email,
      password: data.password,
    })
    if (response.error) {
      setLoginError(response.error.message || ERRORS.SOMETHING_WRONG)
    } else {
      router.push(PAGES.MAIN)
    }
  }

  return (
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
  )
}
