import localFont from 'next/font/local'

export const fontAtyp = localFont({
  variable: '--font-atyp',
  src: [
    {
      path: '../../public/fonts/atyp-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})
