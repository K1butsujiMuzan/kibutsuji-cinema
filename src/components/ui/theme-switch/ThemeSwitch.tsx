'use client'

import {
  ThemeIconDark,
  ThemeIconLight,
  ThemeIconSystem,
} from '@/components/ui/theme-switch/ThemeIcons'
import { THEMES } from '@/components/ui/theme-switch/theme-switch.data'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function ThemeSwitch({ className }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { theme, setTheme } = useTheme()

  const themeChange = useCallback(() => {
    setTheme(
      theme === THEMES.DARK
        ? THEMES.LIGHT
        : theme === THEMES.LIGHT
          ? THEMES.SYSTEM
          : THEMES.DARK,
    )
  }, [theme])

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn('group disabled:cursor-not-allowed!', className)}
        aria-label={'change theme'}
        disabled={true}
      >
        <div
          className={
            'w-8 aspect-square rounded-md group-hover:bg-pink-100 dark:group-hover:bg-gray-600 group-active:bg-pink-100 dark:group-active:bg-gray-600 transition duration-300'
          }
        ></div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={themeChange}
      className={cn('group', className)}
      aria-label={`Current theme: ${theme}. Click to change theme`}
    >
      <div
        className={
          'p-2 rounded-md group-hover:bg-pink-100 dark:group-hover:bg-gray-600 group-active:bg-pink-100 dark:group-active:bg-gray-600 group-active:scale-97 transition duration-300'
        }
      >
        {theme === THEMES.DARK ? (
          <ThemeIconDark />
        ) : theme === THEMES.LIGHT ? (
          <ThemeIconLight />
        ) : (
          <ThemeIconSystem />
        )}
      </div>
    </button>
  )
}
