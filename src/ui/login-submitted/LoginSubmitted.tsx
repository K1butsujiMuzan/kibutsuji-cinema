import Image from 'next/image'
import girl from '../../../public/images/password-reset/girl.png'

interface Props {
  email: string
  text: string
}

export default function LoginSubmitted({ email, text }: Props) {
  return (
    <div className={'text-center pt-11 md:pt-0'}>
      <div className={'flex flex-col items-center relative mb-3'}>
        <h1
          className={
            'text-22 leading-7 font-semibold text-pink-400 dark:text-pink-200 px-4 py-2.5 border-3'
          }
        >
          Thank you!
        </h1>
        <span
          className={`
            relative -top-0.5
            before:content-[""] before:block before:border-l-11 before:border-l-transparent before:border-r-11 before:border-r-transparent before:border-t-16 before:border-t-pink-400 dark:before:border-t-pink-200
            after:content-[""] after:block after:absolute after:-top-1.5 after:border-l-11 after:border-l-transparent after:border-r-11 after:border-r-transparent after:border-t-16 after:border-t-gray-50 dark:after:border-t-gray-950
          `}
        />
      </div>
      <Image
        src={girl}
        alt={''}
        width={350}
        height={348}
        className={'max-w-47 mx-auto mb-6'}
      />
      <h2 className={'text-xl leading-6.5 font-semibold mb-2'}>{text}</h2>
      <p
        className={'leading-4.5 text-sm font-medium md:text-base md:leading-6'}
      >
        Check your email {email}.
      </p>
    </div>
  )
}
