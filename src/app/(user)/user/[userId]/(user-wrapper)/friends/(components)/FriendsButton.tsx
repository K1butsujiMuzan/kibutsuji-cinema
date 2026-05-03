'use client'

import { cn } from '@/lib/utils'

interface Props {
  text: string
  onClick: () => void
  isActive: boolean
}

export default function FriendsButton({ text, onClick, isActive }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-nowrap font-medium p-2 rounded-md active:scale-97 transition duration-300',
        {
          'bg-pink-70 dark:bg-gray-750 shadow-md': isActive,
          'hover:bg-pink-70 dark:hover:bg-gray-750 active:bg-pink-70 dark:active:bg-gray-750':
            !isActive,
        },
      )}
      type="button"
    >
      {text}
    </button>
  )
}
