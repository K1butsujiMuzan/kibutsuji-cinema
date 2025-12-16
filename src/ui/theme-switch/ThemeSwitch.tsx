'use client'

import {
  ThemeIconDark,
  ThemeIconLight,
  ThemeIconSystem,
} from '@/ui/theme-switch/ThemeIcons'
import { EThemes } from '@/ui/theme-switch/themeSwitch.data'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { theme, setTheme } = useTheme()

  const themeChange = useCallback(() => {
    setTheme(
      theme === EThemes.DARK
        ? EThemes.LIGHT
        : theme === EThemes.LIGHT
          ? EThemes.SYSTEM
          : EThemes.DARK,
    )
  }, [theme])

  if (!mounted) {
    return (
      <button
        type="button"
        className={
          'flex w-8 md:w-10 aspect-square rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
        }
        aria-label={'change theme'}
      ></button>
    )
  }

  return (
    <button
      type="button"
      onClick={themeChange}
      className={
        ' aspect-square p-1 md:p-2 rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300'
      }
      aria-label={`Current theme: ${theme}. Click to change theme`}
    >
      {theme === EThemes.DARK ? (
        <ThemeIconDark />
      ) : theme === EThemes.LIGHT ? (
        <ThemeIconLight />
      ) : (
        <ThemeIconSystem />
      )}
    </button>
  )
}
