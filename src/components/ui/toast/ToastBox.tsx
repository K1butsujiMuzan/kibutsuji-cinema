'use client'

import { createPortal } from 'react-dom'
import { useToasts } from '@/stores/useToastsStore'
import Toast from '@/components/ui/toast/Toast'
import { useEffect, useState } from 'react'

export default function ToastBox() {
  const [mounted, setMounted] = useState(false)
  const toasts = useToasts()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const box = document.getElementById('toasts-box') as HTMLDivElement

  if (!box) return null

  return createPortal(
    <>
      {toasts.length > 0 &&
        toasts.map((item) => (
          <Toast
            id={item.id}
            title={item.title}
            message={item.message}
            isSuccess={item.isSuccess}
            key={item.id}
          />
        ))}
    </>,
    box,
  )
}
