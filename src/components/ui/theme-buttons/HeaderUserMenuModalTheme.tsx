'use client'

import { useThemeChange } from '@/hooks/useThemeChange'
import { THEMES } from '@/constants/theme'
import {
  ThemeIconDark,
  ThemeIconLight,
  ThemeIconSystem,
} from '@/components/icons/ThemeIcons'
import { useEffect, useState } from 'react'

export default function HeaderUserMenuModalTheme() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { theme, toggleTheme } = useThemeChange()

  if (!theme || !isMounted) {
    return (
      <button
        aria-label={'change theme'}
        disabled={true}
        onClick={toggleTheme}
        type={'button'}
        className={
          'w-full disabled:cursor-not-allowed! flex items-center justify-between overflow-hidden gap-2 px-3.5 py-2 rounded-sm hover:bg-pink-70 dark:hover:bg-gray-500 active:bg-pink-70 dark:active:bg-gray-500 transition duration-300'
        }
      >
        <div className={'flex items-center overflow-hidden gap-2'}>
          <span
            className={'overflow-hidden text-nowrap text-ellipsis font-medium'}
          >
            Site theme
          </span>
        </div>
      </button>
    )
  }

  const themeLabel = theme[0].toUpperCase() + theme?.slice(1)

  return (
    <button
      onClick={toggleTheme}
      type={'button'}
      className={
        'w-full flex items-center justify-between overflow-hidden gap-2 px-3.5 py-2 rounded-sm hover:bg-pink-70 dark:hover:bg-gray-500 active:bg-pink-70 dark:active:bg-gray-500 transition duration-300'
      }
      aria-label={`Current theme: ${theme}. Click to change theme`}
    >
      <div className={'flex items-center overflow-hidden gap-2'}>
        {theme === THEMES.DARK ? (
          <ThemeIconDark className={'h-4 w-4'} />
        ) : theme === THEMES.LIGHT ? (
          <ThemeIconLight className={'h-4 w-4'} />
        ) : (
          <ThemeIconSystem className={'h-4 w-4'} />
        )}
        <span
          className={'overflow-hidden text-nowrap text-ellipsis font-medium'}
        >
          Site theme
        </span>
      </div>
      <span className={'overflow-hidden text-xs text-nowrap text-ellipsis'}>
        {themeLabel}
      </span>
    </button>
  )
}
