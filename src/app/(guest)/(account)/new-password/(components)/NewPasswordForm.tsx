'use client'

import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '@/components/ui/error-message/ErrorMessage'
import LoginButton from '@/components/ui/login-button/LoginButton'
import {
  newPasswordSchema,
  type TNewPassword,
} from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginPassword from '@/components/ui/login-password/LoginPassword'
import { useState } from 'react'
import { resetPassword } from '@/lib/auth-client'
import { useSearchParams } from 'next/navigation'
import { ERRORS } from '@/constants/errors'
import NewPasswordSubmitted from '@/app/(guest)/(account)/new-password/(components)/NewPasswordSubmitted'
import NewPasswordTitle from '@/app/(guest)/(account)/new-password/(components)/NewPasswordTitle'

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

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onFormSubmit: SubmitHandler<TNewPassword> = async (data) => {
    setError(null)
    try {
      const response = await resetPassword({
        newPassword: data.password,
        token: params.get('token') || '',
      })
      if (response.error) {
        return setError(response.error?.message || ERRORS.SOMETHING_WRONG)
      }
      setIsSubmitted(true)
    } catch (error) {
      setError(ERRORS.SOMETHING_WRONG)
      console.error(error)
    }
  }

  if (isSubmitted) {
    return <NewPasswordSubmitted />
  }

  return (
    <>
      <NewPasswordTitle />
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
                  autoComplete={'new-password'}
                  maxLength={50}
                  isValid={!!errors.password?.message}
                  isDirty={!!dirtyFields.password}
                  labelText={'New password'}
                  id={'password'}
                />
              )}
            />
            {error && <ErrorMessage message={error} />}
          </div>
          <Controller
            name={'passwordRepeat'}
            control={control}
            render={({ field }) => (
              <LoginPassword
                {...field}
                autoComplete={'new-password'}
                maxLength={50}
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
    </>
  )
}
