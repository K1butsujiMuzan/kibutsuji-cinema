'use client'

import dynamic from 'next/dynamic'

const DynamicToastBox = dynamic(() => import('./ToastBox'), {
  ssr: false,
})

export default function ToastWrapper() {
  return <DynamicToastBox />
}
