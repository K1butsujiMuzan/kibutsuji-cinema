'use client'

import {signUp} from '@/lib/auth-client'
import LoginInput from '@/ui/login-input/LoginInput'
import LoginButton from '@/ui/login-button/LoginButton'
import LoginOptions from '@/ui/login-options/LoginOptions'
import LoginCheckbox from '@/ui/login-checkbox/LoginCheckbox'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import {
  registerScheme,
  type TRegister,
} from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginPassword from '@/ui/login-password/LoginPassword'
import {useState} from "react";
import {ERRORS} from "@/constants/errors";
import {useRouter} from "next/navigation";
import {PAGES} from "@/configs/pages.config";
import ErrorMessage from "@/ui/error-message/ErrorMessage";

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors, dirtyFields, isSubmitting },
  } = useForm<TRegister>({
    resolver: zodResolver(registerScheme),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
  })
  const [registerErrors, setRegisterErrors] = useState<string | null>(null)
  const router = useRouter()

  const onFormSubmit: SubmitHandler<TRegister> = async (data) => {
    setRegisterErrors(null)

    const response = await signUp.email({
      name: 'guest',
      email: data.email,
      password: data.password,
      callbackURL: PAGES.MAIN
    })

    if(response.error) {
      setRegisterErrors(response.error.message || ERRORS.SOMETHING_WRONG)
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
        {registerErrors && <ErrorMessage message={registerErrors} />}
        <Controller
          name={'password'}
          control={control}
          render={({ field }) => (
            <LoginPassword
              {...field}
              isValid={!!errors.password?.message}
              labelText={'Password'}
              id={'password'}
              isDirty={!!dirtyFields.password}
            />
          )}
        />
        <small className={'text-xs leading-4 font-semibold py-1'}>
          The password must contain at least 8 characters without spaces.
        </small>
        <div className={'pt-4 w-full flex'}>
          <Controller
            name={'agreement'}
            control={control}
            render={({ field }) => {
              const { value, ...rest } = field

              return (
                <LoginCheckbox
                  id={'agreement'}
                  inputValue={value}
                  {...rest}
                  text={'Send me Kibutsuji news and offers.'}
                />
              )
            }}
          />
        </div>
      </div>
      <LoginOptions />
      <LoginButton
        text={isSubmitting ? 'Creating...' : 'Create an Account'}
        disabled={!isValid || isSubmitting}
      />
    </form>
  )
}
