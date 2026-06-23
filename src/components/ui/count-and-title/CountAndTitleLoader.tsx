import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function CountAndTitleLoader({ className }: Props) {
  return (
    <span
      className={cn(
        'h-6.75 w-30 rounded-sm block bg-pink-50 dark:bg-gray-750 animate-pulse',
        className,
      )}
    />
  )
}
