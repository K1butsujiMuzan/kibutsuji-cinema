import TextLink from '@/components/ui/text-link/TextLink'

interface Props {
  firstHref: string
  firstText: string
  secondHref: string
  secondText: string
}

export default function LoginLinks({
  firstHref,
  firstText,
  secondHref,
  secondText,
}: Props) {
  return (
    <div
      className={
        'flex gap-2 justify-center flex-wrap items-center text-sm font-medium uppercase'
      }
    >
      <TextLink type={'link'} href={firstHref}>
        {firstText}
      </TextLink>
      <span aria-hidden={true}>|</span>
      <TextLink type={'link'} href={secondHref}>
        {secondText}
      </TextLink>
    </div>
  )
}
