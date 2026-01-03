'use client'

import LoginInput from '@/ui/login-input/LoginInput'
import LoginButton from '@/ui/login-button/LoginButton'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { resetScheme, type TReset } from '@/shared/schemes/register.scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export default function ResetForm() {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TReset>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(resetScheme),
  })

  const onFormSubmit: SubmitHandler<TReset> = (data) => {
    console.log(data)
  }

  return (
    <form
      className={'w-full max-w-104 flex flex-col gap-5'}
      onSubmit={handleSubmit(onFormSubmit)}
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
      </div>
      <LoginButton text={'Send'} disabled={!isValid} />
    </form>
  )
}
