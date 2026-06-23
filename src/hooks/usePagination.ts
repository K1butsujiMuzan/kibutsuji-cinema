'use client'

import { useCallback, useState } from 'react'

export default function usePagination() {
  const [page, setPage] = useState<number>(1)

  const onNextPage = useCallback(
    () => setPage((prevState) => prevState + 1),
    [],
  )
  const onPreviousPage = useCallback(
    () => setPage((prevState) => prevState - 1),
    [],
  )

  const setFirstPage = useCallback(() => {
    setPage(1)
  }, [])

  return { page, onNextPage, onPreviousPage, setFirstPage }
}
