import { type SubmitHandler, useForm } from 'react-hook-form'
import { resetScheme, type TReset } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { requestPasswordReset } from '@/lib/auth-client'
import { PAGES } from '@/shared/configs/pages.config'
import { ERRORS } from '@/shared/configs/errors.config'

export const useResetPassword = () => {
  const {
    register,
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
    try {
      const response = await requestPasswordReset({
        email: data.email,
        redirectTo: `${window.location.origin}/${PAGES.NEW_PASSWORD}`,
      })
      if (response.error) {
        return setError(response.error.message || ERRORS.SOMETHING_WRONG)
      }
      setIsSubmitted(true)
    } catch (error) {
      setError(ERRORS.SOMETHING_WRONG)
      console.error(error)
    }
  }

  return {
    isSubmitted,
    getValues,
    handleSubmit,
    onFormSubmit,
    error,
    errors,
    isSubmitting,
    isValid,
    register,
  }
}
