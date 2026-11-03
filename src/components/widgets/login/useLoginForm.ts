import { type SubmitHandler, useForm } from 'react-hook-form'
import { loginScheme, type TLogin } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { sendVerificationEmail, signIn } from '@/lib/auth-client'
import { PAGES } from '@/shared/configs/pages.config'
import { ERRORS } from '@/shared/configs/errors.config'

export const useLoginForm = () => {
  const {
    register,
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
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onFormSubmit: SubmitHandler<TLogin> = async (data) => {
    setError(null)
    try {
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
            return setError(
              emailVerification.error.message || ERRORS.SOMETHING_WRONG,
            )
          }
          return setIsVerificationSent(true)
        }
        setError(response.error.message || ERRORS.SOMETHING_WRONG)
      }
    } catch (error) {
      setError(ERRORS.SOMETHING_WRONG)
      console.error(error)
    }
  }

  return {
    isVerificationSent,
    getValues,
    handleSubmit,
    onFormSubmit,
    isSubmitting,
    isValid,
    errors,
    error,
    dirtyFields,
    register,
  }
}
