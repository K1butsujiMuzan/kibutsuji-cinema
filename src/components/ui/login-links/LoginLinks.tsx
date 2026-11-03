import { cn } from '@/lib/utils'
import TextLink from '@/components/ui/text-link/TextLink'

interface Props {
  firstHref: string
  firstText: string
  secondHref: string
  secondText: string
  className?: string
}

export default function LoginLinks({
  firstHref,
  firstText,
  secondHref,
  secondText,
  className,
}: Props) {
  return (
    <div className={cn('flex gap-2 justify-center items-center', className)}>
      <TextLink
        type={'link'}
        href={firstHref}
        className={'text-sm font-semibold uppercase'}
      >
        {firstText}
      </TextLink>
      <span className={'text-sm font-bold leading-4.5'}> | </span>
      <TextLink
        type={'link'}
        href={secondHref}
        className={'text-sm font-semibold uppercase'}
      >
        {secondText}
      </TextLink>
    </div>
  )
}
