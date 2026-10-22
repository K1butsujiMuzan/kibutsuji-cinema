import type { TWelcomeMoreIconSlide } from '@/components/widgets/Welcome/WelcomeMore/welcome-more.types'

type Props = {
  ariaLabel: string
} & TWelcomeMoreIconSlide

export default function WelcomeMoreSlide({
  text,
  icon: Icon,
  ariaLabel,
}: Props) {
  return (
    <li
      aria-label={ariaLabel}
      className={
        'flex flex-col items-center gap-3 shrink-0 snap-start snap-always px-2 py-1.5'
      }
    >
      <Icon />
      <p className={'text-sm text-center'}>{text}</p>
    </li>
  )
}
