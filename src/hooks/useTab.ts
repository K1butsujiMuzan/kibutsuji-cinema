'use client'

import { type KeyboardEvent, useCallback, useId, useRef, useState } from 'react'
import { KEYCODES } from '@/shared/constants/keycodes'

export const useTab = (listLength: number) => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const tabId = useId()
  const panelId = useId()
  const tabsRef = useRef<HTMLButtonElement[]>([])

  const focusTab = useCallback((index: number) => {
    tabsRef.current[index]?.focus()
  }, [])

  const onTabClick = useCallback((index: number) => {
    setCurrentTab(index)
  }, [])

  const onTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === KEYCODES.ARROW_LEFT ||
      event.key === KEYCODES.ARROW_RIGHT ||
      event.key === KEYCODES.HOME ||
      event.key === KEYCODES.END
    ) {
      event.preventDefault()

      let newTab = 0

      if (
        event.key === KEYCODES.HOME ||
        (event.key === KEYCODES.ARROW_RIGHT && currentTab === listLength - 1)
      ) {
        newTab = 0
      } else if (
        event.key === KEYCODES.END ||
        (event.key === KEYCODES.ARROW_LEFT && currentTab === 0)
      ) {
        newTab = listLength - 1
      } else if (event.key === KEYCODES.ARROW_LEFT) {
        newTab = currentTab - 1
      } else if (event.key === KEYCODES.ARROW_RIGHT) {
        newTab = currentTab + 1
      }

      setCurrentTab(newTab)
      focusTab(newTab)
    }
  }

  return {
    currentTab,
    tabsRef,
    onTabClick,
    onTabListKeyDown,
    tabId,
    panelId,
  }
}
