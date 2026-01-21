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

export default function NewPasswordForm() {
  const params = useSearchParams()

  const {
    control,
    formState: { isValid, errors, isSubmitting, dirtyFields },
    handleSubmit,
    clearErrors,
    setError,
  } = useForm<TNewPassword>({
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
    mode: 'onChange',
    resolver: zodResolver(newPasswordSchema),
  })

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const onFormSubmit: SubmitHandler<TNewPassword> = async (data) => {
    clearErrors('root')

    const response = await resetPassword({
      newPassword: data.password,
      token: params.get('token') || '',
    })
    if (response.error) {
      setError('root', {
        message: response.error?.message || ERRORS.SOMETHING_WRONG,
      })
    } else {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return <NewPasswordSubmitted />
  }

  return (
    <>
      <h1
        className={
          'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-5 text-center'
        }
      >
        Create a new password
      </h1>
      <p
        className={
          'md:leading-6.5 md:text-18 max-w-104 text-center font-medium'
        }
      >
        For security, your password must be 6 or more characters long.
      </p>
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
            {errors.root?.message && (
              <ErrorMessage message={errors.root.message} />
            )}
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
