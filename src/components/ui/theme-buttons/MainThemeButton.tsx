'use client'

import {
  ThemeIconDark,
  ThemeIconLight,
  ThemeIconSystem,
} from '@/components/icons/ThemeIcons'
import { THEMES } from '@/shared/constants/theme'
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
      <div>
        <span className={'sr-only'}>Loading</span>
        <div
          className={
            'w-10 aspect-square rounded-md bg-base-button animate-pulse'
          }
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn('group', className)}
      aria-label={`current theme: ${theme}. Click to change theme`}
    >
      <span
        className={
          'flex justify-center items-center p-2 rounded-md bg-base-button group-hover:bg-base-button-hover group-active:bg-base-button-hover group-active:scale-97 transition duration-300'
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
