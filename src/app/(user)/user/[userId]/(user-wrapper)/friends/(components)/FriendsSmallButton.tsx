'use client'

import { cn } from '@/lib/utils'

interface Props {
  ariaLabel: string
  icon: React.ReactNode
  onClick: () => void
  className?: string
  disabled: boolean
}

export default function FriendsSmallButton({
  ariaLabel,
  icon,
  onClick,
  disabled,
  className,
}: Props) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        'disabled:cursor-not-allowed! disabled:opacity-75 p-2 rounded-md bg-pink-50 dark:bg-gray-750 not-disabled:hover:bg-pink-100 not-disabled:dark:hover:bg-gray-600 not-disabled:active:bg-pink-100 not-disabled:dark:active:bg-gray-600 not-disabled:active:scale-97 transition duration-300',
        className,
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}
