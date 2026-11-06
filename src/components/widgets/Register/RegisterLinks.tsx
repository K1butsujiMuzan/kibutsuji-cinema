import { PAGES } from '@/shared/configs/pages.config'
import TextLink from '@/components/ui/text-link/TextLink'

export default function RegisterLinks() {
  return (
    <div className={'max-w-104 text-center flex flex-col gap-5'}>
      <div className={'text-sm font-medium'}>
        <span>Already have an account? </span>
        <TextLink type={'link'} href={PAGES.LOGIN} className={'uppercase'}>
          Log in
        </TextLink>
      </div>
      <small className={'text-xs'}>
        <span>By creating an account, you agree to our </span>
        <TextLink type={'link'} href={PAGES.TOS}>
          Terms of Use
        </TextLink>
        <span> and </span>
        <TextLink type={'link'} href={PAGES.PRIVACY}>
          Privacy Policy
        </TextLink>
        <span> and confirm that you are at least 16 years old.</span>
      </small>
    </div>
  )
}
