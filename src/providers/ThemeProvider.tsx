'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextThemeProvider
      attribute={'class'}
      enableSystem={true}
      enableColorScheme={true}
      defaultTheme={'system'}
      storageKey={'theme'}
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemeProvider>
  )
}
