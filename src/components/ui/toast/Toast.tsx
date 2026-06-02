'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRemoveToast } from '@/stores/useToastsStore'
import type { TToast } from '@/shared/types/toast.type'
import { cn } from '@/lib/utils'
import {
  ToastErrorIcon,
  ToastSuccessIcon,
} from '@/components/ui/toast/ToastIcons'
import Button from '@/components/ui/button/Button'
import CloseIcon from '@/components/icons/CloseIcon'

export default function Toast({ id, title, message, isSuccess }: TToast) {
  const closeModal = useRemoveToast()
  const [isShown, setIsShown] = useState<boolean>(false)

  const onClose = useCallback(() => {
    setIsShown(false)
    setTimeout(() => {
      closeModal(id)
    }, 300)
  }, [id, closeModal])

  useEffect(() => {
    const animate = requestAnimationFrame(() => {
      setIsShown(true)
    })
    const closeTimeout = setTimeout(() => {
      onClose()
    }, 5000)

    return () => {
      clearTimeout(closeTimeout)
      cancelAnimationFrame(animate)
    }
  }, [onClose])

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-atomic={true}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      className={cn(
        'text-gray-700 dark:text-gray-100 bg-pink-50 dark:bg-gray-750 p-3 flex items-center gap-3 rounded-xl overflow-hidden relative transition duration-300',
        'after:content-[""] after:block after:bg-pink-300 after:h-1 after:w-full after:absolute after:left-0 after:bottom-0 hide-toast-indicator',
        {
          'translate-x-[calc(100%+1rem)] opacity-0': !isShown,
          'translate-x-0 opacity-100': isShown,
        },
      )}
    >
      <div className={'flex items-center gap-3'}>
        {isSuccess ? <ToastSuccessIcon /> : <ToastErrorIcon />}
        <div className={'max-w-[calc(100dvw-9rem)] sm:max-w-100'}>
          <p className={'font-semibold text-xl leading-6 truncate'}>{title}</p>
          <p className={'leading-5 text-sm truncate'}>{message}</p>
        </div>
      </div>
      <Button onClick={onClose} className={'p-1'} aria-label={'close toast'}>
        <CloseIcon />
      </Button>
    </div>
  )
}
