import type { Metadata } from 'next'
import '../styles/globals.css'
import { fontAtyp } from '@/shared/constants/fonts'
import ThemeProvider from '@/providers/ThemeProvider'
import Footer from '@/components/layouts/footer/Footer'
import MainQueryProvider from '@/providers/MainQueryProvider'
import ToastBox from '@/components/ui/toast/ToastBox'

export const metadata: Metadata = {
  title: {
    template: '%s - Kibutsuji',
    default: 'Kibutsuji',
  },
  description: 'Online-cinema Kibutsuji',
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
      className={'bg-base-bg text-base-text'}
    >
      <body className={`${fontAtyp.variable} antialiased font-main`}>
        <ThemeProvider>
          <MainQueryProvider>
            <div className="root">
              {children}
              <Footer />
            </div>
            <div id="toasts-box" className={'toasts-box'}>
              <ToastBox />
            </div>
          </MainQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
