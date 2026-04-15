'use client'

import { createPortal } from 'react-dom'
import { useToasts } from '@/stores/useToastsStore'
import Toast from '@/components/ui/toast/Toast'

export default function ToastBox() {
  const box = document.getElementById('toasts-box') as HTMLDivElement
  const toasts = useToasts()

  if (!box) {
    return null
  }

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
