import { cn } from '@/lib/utils'

interface Props {
  className: string
}

export default function BlockLoader({ className }: Props) {
  return (
    <span
      aria-hidden={true}
      className={cn(
        'rounded-sm bg-pink-50 dark:bg-gray-750 block animate-pulse',
        className,
      )}
    />
  )
}
