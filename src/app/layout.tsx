import type { Metadata } from 'next'
import '../styles/globals.css'
import { fontPoppins } from '@/constants/fonts'
import ThemeProvider from '@/providers/ThemeProvider'
import Footer from '@/layout/footer/Footer'

export const metadata: Metadata = {
  title: 'Kibutsuji',
  description: 'Online-cinema Kibutsuji',
  robots: 'index follow',
  authors: [{ name: 'K1butsujiMuzan' }],
  creator: 'K1butsujiMuzan',
  publisher: 'K1butsujiMuzan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-100'}
    >
      <body className={`${fontPoppins.variable} antialiased font-main`}>
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
