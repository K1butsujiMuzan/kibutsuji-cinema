import { type SubmitHandler, useForm } from 'react-hook-form'
import {
  registerScheme,
  type TRegister,
} from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { signUp } from '@/lib/auth-client'
import { PRISMA_DEFAULT_NAME } from '@/shared/constants/prisma-values'
import { PAGES } from '@/shared/configs/pages.config'
import { ERRORS } from '@/shared/configs/errors.config'

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors, dirtyFields, isSubmitting },
  } = useForm<TRegister>({
    resolver: zodResolver(registerScheme),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      isReceiveNotifications: false,
    },
  })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onFormSubmit: SubmitHandler<TRegister> = async (data) => {
    setError(null)
    try {
      const response = await signUp.email({
        name: PRISMA_DEFAULT_NAME,
        email: data.email,
        password: data.password,
        isReceiveNotifications: data.isReceiveNotifications,
        callbackURL: PAGES.MAIN,
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
    isSubmitting,
    isValid,
    errors,
    dirtyFields,
    error,
    register,
  }
}
