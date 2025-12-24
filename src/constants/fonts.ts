import localFont from 'next/font/local'

export const fontAtyp = localFont({
  variable: '--font-atyp',
  src: [
    {
      path: '../../public/fonts/AtypRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AtypMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AtypSemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AtypBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})
