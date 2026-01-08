'use client'

import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '@/ui/error-message/ErrorMessage'
import LoginButton from '@/ui/login-button/LoginButton'
import {
  newPasswordSchema,
  type TNewPassword,
} from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginPassword from '@/ui/login-password/LoginPassword'
import { useState } from 'react'
import { resetPassword } from '@/lib/auth-client'
import { useSearchParams } from 'next/navigation'
import { ERRORS } from '@/constants/errors'

export default function NewPasswordForm() {
  const params = useSearchParams()

  const {
    control,
    formState: { isValid, errors, isSubmitting, dirtyFields },
    handleSubmit,
  } = useForm<TNewPassword>({
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
    mode: 'onChange',
    resolver: zodResolver(newPasswordSchema),
  })

  const [passwordError, setPasswordError] = useState<string | null>(null)

  const onFormSubmit: SubmitHandler<TNewPassword> = async (data) => {
    setPasswordError(null)

    const response = await resetPassword({
      newPassword: data.password,
      token: params.get('token') || '',
    })
    if (response.error) {
      setPasswordError(response.error?.message || ERRORS.SOMETHING_WRONG)
    }
  }

  return (
    <form
      className={'w-full max-w-104 flex flex-col gap-5'}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className={'flex flex-col gap-8 py-5 md:py-10'}>
        <div className={'flex flex-col gap-4'}>
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <LoginPassword
                {...field}
                isValid={!!errors.password?.message}
                isDirty={!!dirtyFields.password}
                labelText={'New password'}
                id={'password'}
              />
            )}
          />
          {passwordError && <ErrorMessage message={passwordError} />}
        </div>
        <Controller
          name={'passwordRepeat'}
          control={control}
          render={({ field }) => (
            <LoginPassword
              {...field}
              isValid={!!errors.passwordRepeat?.message}
              isDirty={!!dirtyFields.passwordRepeat}
              labelText={'Enter the new password again'}
              id={'passwordRepeat'}
            />
          )}
        />
        <small className={'text-xs leading-4 font-semibold py-1'}>
          The password must contain at least 6 characters without spaces
        </small>
      </div>
      <LoginButton
        text={isSubmitting ? 'Reset...' : 'Reset password'}
        disabled={!isValid || isSubmitting}
      />
    </form>
  )
}
