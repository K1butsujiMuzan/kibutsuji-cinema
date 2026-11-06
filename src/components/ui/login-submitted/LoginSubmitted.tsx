import Hime from '@/components/ui/hime/Hime'

type Props = {
  email: string
  text: string
}

export default function LoginSubmitted({ email, text }: Props) {
  return (
    <div className={'text-center pt-11 md:pt-0'}>
      <h1 className={'sr-only'}>{text}</h1>
      <Hime text={'Thank you!'} type={'happy'} className={'mb-6'} />
      <h2 className={'text-xl font-semibold mb-2'}>{text}</h2>
      <p className={'text-sm font-medium md:text-base'}>
        Check your email {email}
      </p>
    </div>
  )
}
