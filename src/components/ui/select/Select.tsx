'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PageChangerIcon from '@/components/icons/PageChangerIcon'
import { cn } from '@/lib/utils'
import Loader from '@/components/ui/loader/Loader'
import { KEYCODES } from '@/constants/keycodes'
import { type FocusEvent, type KeyboardEvent } from 'react'

interface Props<T extends string> {
  options: { value: T; color?: string }[]
  Icon?: React.ReactNode
  defaultValue: string
  onSelect: (value: T) => void
  disabled?: boolean
  label: string
}

export default function Select<T extends string>({
  options,
  Icon,
  defaultValue,
  onSelect,
  disabled,
  label,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<null | HTMLDivElement>(null)
  const selectRef = useRef<null | HTMLButtonElement>(null)
  const tabsRef = useRef<(HTMLLIElement | null)[]>([])
  const currentTabRef = useRef<number>(-1)

  const color = useMemo(() => {
    return options.find((item) => item.value === defaultValue)?.color
  }, [options, defaultValue])

  const { labelId, listId } = useMemo(() => {
    const labelId = label.toLowerCase().split(' ').join('-')
    const listId = labelId + '-list'
    return { labelId, listId }
  }, [label])

  const closeSelect = useCallback(() => {
    setIsOpen(false)
    currentTabRef.current = -1
  }, [])

  const openSelect = useCallback(() => {
    setIsOpen(true)
  }, [])

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  const focusCurrentTab = useCallback(() => {
    tabsRef.current[currentTabRef.current]?.focus()
  }, [])

  const onBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      if (
        containerRef &&
        !containerRef.current?.contains(event.relatedTarget as Node)
      ) {
        return closeSelect()
      }
    },
    [closeSelect],
  )

  const focusTab = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) {
        if (event.key === KEYCODES.ARROW_UP || event.key === KEYCODES.END) {
          event.preventDefault()
          openSelect()
          return (currentTabRef.current = options.length - 1)
        }
        if (event.key === KEYCODES.ARROW_DOWN || event.key === KEYCODES.HOME) {
          event.preventDefault()
          openSelect()
          return (currentTabRef.current = 0)
        }
        return
      }
      if (event.key === KEYCODES.ARROW_UP) {
        event.preventDefault()
        currentTabRef.current =
          currentTabRef.current <= 0
            ? options.length - 1
            : currentTabRef.current - 1
        return focusCurrentTab()
      }
      if (event.key === KEYCODES.ARROW_DOWN) {
        event.preventDefault()
        currentTabRef.current =
          currentTabRef.current === -1
            ? 0
            : currentTabRef.current === options.length - 1
              ? 0
              : currentTabRef.current + 1
        return focusCurrentTab()
      }
      if (event.key === KEYCODES.HOME) {
        event.preventDefault()
        currentTabRef.current = 0
        return focusCurrentTab()
      }
      if (event.key === KEYCODES.END) {
        event.preventDefault()
        currentTabRef.current = options.length - 1
        return focusCurrentTab()
      }
      if (event.key === KEYCODES.ESCAPE) {
        selectRef.current?.focus()
        return closeSelect()
      }
    },
    [focusCurrentTab, closeSelect, isOpen, openSelect, options],
  )

  useEffect(() => {
    if (isOpen && currentTabRef.current !== -1) {
      focusCurrentTab()
    }
  }, [isOpen, focusCurrentTab])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const checkClickAria = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeSelect()
      }
    }
    window.addEventListener('pointerdown', checkClickAria)
    return () => {
      window.removeEventListener('pointerdown', checkClickAria)
    }
  }, [isOpen, closeSelect, focusCurrentTab])

  return (
    <div
      onKeyDown={focusTab}
      onBlur={onBlur}
      ref={containerRef}
      className={'relative'}
    >
      <span id={labelId} className={'sr-only'}>
        {label}
      </span>
      {disabled && (
        <div
          className={
            'absolute inset-0 bg-black/40 z-10 flex justify-center items-center'
          }
        >
          <Loader className={'w-5 h-5'} />
        </div>
      )}
      <button
        aria-controls={listId}
        onFocus={() => (currentTabRef.current = -1)}
        aria-expanded={isOpen}
        aria-haspopup={'listbox'}
        role={'combobox'}
        aria-labelledby={labelId}
        ref={selectRef}
        disabled={disabled}
        onClick={toggleIsOpen}
        type={'button'}
        className={
          'w-full cursor-pointer rounded-md bg-pink-50 dark:bg-gray-750 flex items-center justify-between border border-pink-50 dark:border-gray-200 not-disabled:active:scale-97 disabled:cursor-not-allowed! transition duration-300'
        }
      >
        <span
          className={cn(
            'flex gap-1.5 items-center pl-2.5 pr-1.5 py-1.25 truncate',
            color,
          )}
        >
          {Icon}
          <span className={'truncate font-medium'}>
            {defaultValue.at(0)?.toUpperCase() +
              defaultValue.slice(1)?.toLowerCase()}
          </span>
        </span>
        <span
          className={
            'px-2.5 py-2.75 border-l border-pink-50 dark:border-gray-200'
          }
        >
          <PageChangerIcon
            className={cn('w-3 h-3 transition duration-300', {
              '-rotate-90': isOpen,
              'rotate-90': !isOpen,
            })}
          />
        </span>
      </button>
      {isOpen && (
        <ul
          id={listId}
          role={'listbox'}
          aria-labelledby={labelId}
          className={
            'top-[calc(100%+0.5rem)] w-full absolute p-1.5 flex flex-col gap-1 rounded-md bg-pink-50 dark:bg-gray-750'
          }
        >
          {options.map((item, index) => (
            <li
              className={
                'w-full cursor-pointer! truncate px-3.5 py-1.5 rounded-md text-start hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 transition duration-300'
              }
              key={item.value}
              aria-selected={defaultValue === item.value}
              role={'option'}
              ref={(element) => {
                tabsRef.current[index] = element
              }}
              tabIndex={-1}
              onKeyDown={(event) => {
                if (
                  event.key === KEYCODES.ENTER ||
                  event.key === KEYCODES.SPACE
                ) {
                  event.preventDefault()
                  onSelect(item.value)
                  closeSelect()
                  selectRef.current?.focus()
                }
              }}
              onClick={() => {
                onSelect(item.value)
                closeSelect()
                selectRef.current?.focus()
              }}
            >
              {item.value.at(0)?.toUpperCase() +
                item.value.slice(1).toLowerCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
