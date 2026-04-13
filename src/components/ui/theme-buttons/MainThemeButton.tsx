'use client'

import {
  ThemeIconDark,
  ThemeIconLight,
  ThemeIconSystem,
} from '@/components/icons/ThemeIcons'
import { THEMES } from '@/constants/theme'
import { cn } from '@/lib/utils'
import { useThemeChange } from '@/hooks/useThemeChange'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
}

export default function MainThemeButton({ className }: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { theme, toggleTheme } = useThemeChange()

  if (!theme || !isMounted) {
    return (
      <button
        type="button"
        className={cn('group disabled:cursor-not-allowed!', className)}
        aria-label={'change theme'}
        disabled={true}
      >
        <span
          className={
            'block w-8 aspect-square rounded-md group-hover:bg-pink-100 dark:group-hover:bg-gray-600 group-active:bg-pink-100 dark:group-active:bg-gray-600 transition duration-300'
          }
        ></span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn('group', className)}
      aria-label={`Current theme: ${theme}. Click to change theme`}
    >
      <span
        className={
          'flex justify-center items-center  p-2 rounded-md group-hover:bg-pink-100 dark:group-hover:bg-gray-600 group-active:bg-pink-100 dark:group-active:bg-gray-600 group-active:scale-97 transition duration-300'
        }
      >
        {theme === THEMES.DARK ? (
          <ThemeIconDark />
        ) : theme === THEMES.LIGHT ? (
          <ThemeIconLight />
        ) : (
          <ThemeIconSystem />
        )}
      </span>
    </button>
  )
}
