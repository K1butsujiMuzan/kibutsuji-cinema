import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import usePagination from '@/hooks/usePagination'
import { useAddToast } from '@/stores/useToastsStore'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'

export default function useFriend(queryKey: QueryKey) {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search)
  const { page, setFirstPage, onPreviousPage, onNextPage } = usePagination()
  const addToast = useAddToast()
  const queryClient = useQueryClient()
  const QUERY_KEY: QueryKey = [...queryKey, page, debouncedSearch]

  const onSuccess = useCallback(async (data: { error: string | null }) => {
    if (data.error) {
      return addToast({ title: data.error, message: '', isSuccess: false })
    }
    await queryClient.invalidateQueries({ queryKey })
  }, QUERY_KEY)

  const clearSearch = useCallback(() => setSearch(''), [])

  useEffect(() => {
    if (page !== 1) {
      setFirstPage()
    }
  }, [debouncedSearch])

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return {
    QUERY_KEY,
    search,
    debouncedSearch,
    page,
    onPreviousPage,
    onNextPage,
    onSuccess,
    clearSearch,
    onSearch,
  }
}
