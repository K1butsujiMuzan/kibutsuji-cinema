import { useSearchParams } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import {
  newPasswordSchema,
  type TNewPassword,
} from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { resetPassword } from '@/lib/auth-client'
import { ERRORS } from '@/shared/configs/errors.config'

export const useNewPassword = () => {
  const params = useSearchParams()

  const {
    register,
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

  return {
    isSubmitted,
    handleSubmit,
    onFormSubmit,
    errors,
    dirtyFields,
    error,
    isSubmitting,
    isValid,
    register,
  }
}
