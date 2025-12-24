import type { Metadata } from 'next'
import '../styles/globals.css'
import ThemeProvider from '@/providers/ThemeProvider'
import Footer from '@/layout/footer/Footer'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Kibutsuji',
  description: 'Online-cinema Kibutsuji',
  robots: 'index follow',
  authors: [{ name: 'K1butsujiMuzan' }],
  creator: 'K1butsujiMuzan',
  publisher: 'K1butsujiMuzan',
}

const fontAtyp = localFont({
  variable: '--font-atyp',
  src: [
    {
      path: '../fonts/AtypRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/AtypMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/AtypSemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/AtypBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})


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
      <body className={`${fontAtyp.variable} antialiased font-main`}>
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
