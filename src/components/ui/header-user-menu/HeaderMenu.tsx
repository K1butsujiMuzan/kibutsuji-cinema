'use client'

import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import HeaderUserMenuModal from '@/components/ui/header-user-menu/HeaderUserMenuModal'
import { memo } from 'react'
import { KEYCODES } from '@/constants/keycodes'

interface Props {
  userName: string
  userId: string
  className?: string
  isPrivate: boolean
}

export default memo(function HeaderUserMenu({
  className,
  userId,
  userName,
  isPrivate,
}: Props) {
  const [isHeaderUserMenuOpen, setIsHeaderUserMenuOpen] =
    useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const onHeaderUserMenuToggle = useCallback(() => {
    setIsHeaderUserMenuOpen((prevState) => !prevState)
  }, [])

  const onHeaderUserMenuClose = useCallback(() => {
    setIsHeaderUserMenuOpen(false)
  }, [])

  useEffect(() => {
    if (!isHeaderUserMenuOpen) return

    const onClickCheck = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onHeaderUserMenuClose()
      }
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === KEYCODES.ESCAPE) {
        onHeaderUserMenuClose()
      }
    }

    document.addEventListener('pointerdown', onClickCheck)
    window.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('pointerdown', onClickCheck)
      window.removeEventListener('keydown', onEscape)
    }
  }, [isHeaderUserMenuOpen, onHeaderUserMenuClose])

  return (
    <div ref={menuRef} className={'relative'}>
      <button
        onClick={onHeaderUserMenuToggle}
        aria-label={'open header menu'}
        type="button"
        className={cn('group', className)}
      >
        <span
          className={
            'flex justify-center items-center p-2 rounded-md group-hover:bg-pink-100 dark:group-hover:bg-gray-600 group-active:bg-pink-100 dark:group-active:bg-gray-600 group-active:scale-97 transition duration-300'
          }
        >
          <svg
            role={'img'}
            aria-hidden={true}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z"
              fill="#0F0F0F"
            />
            <path
              d="M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5H2C1.44772 5 1 4.55228 1 4Z"
              fill="#0F0F0F"
            />
            <path
              d="M1 20C1 19.4477 1.44772 19 2 19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z"
              fill="#0F0F0F"
            />
          </svg>
        </span>
      </button>
      {isHeaderUserMenuOpen && (
        <HeaderUserMenuModal
          userId={userId}
          userName={userName}
          isPrivate={isPrivate}
          onClose={onHeaderUserMenuClose}
        />
      )}
    </div>
  )
})
