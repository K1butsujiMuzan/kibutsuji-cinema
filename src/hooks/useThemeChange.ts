import { THEMES } from '@/constants/theme'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export const useThemeChange = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(
      theme === THEMES.DARK
        ? THEMES.LIGHT
        : theme === THEMES.LIGHT
          ? THEMES.SYSTEM
          : THEMES.DARK,
    )
  }, [theme])

  return { theme, toggleTheme }
}
