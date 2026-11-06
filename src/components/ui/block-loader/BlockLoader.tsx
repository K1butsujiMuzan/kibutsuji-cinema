import { cn } from '@/lib/utils'

type Props = {
  className: string
}

export default function BlockLoader({ className }: Props) {
  return (
    <span
      aria-hidden={true}
      className={cn(
        'rounded-sm bg-base-second-bg block animate-pulse',
        className,
      )}
    />
  )
}
