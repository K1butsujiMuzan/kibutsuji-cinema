import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'
import usePagination from '@/hooks/usePagination'
import { type QueryKey } from '@tanstack/react-query'

export default function useFriend(queryKey: QueryKey) {
  const [search, setSearch] = useState<string>('')
  const [submitSearch, setSubmitSearch] = useState<string>('')
  const { page, setFirstPage, onPreviousPage, onNextPage } = usePagination()
  const QUERY_KEY = useMemo(() => {
    return [...queryKey, page, submitSearch]
  }, [queryKey, page, submitSearch])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitSearch(search)
    setFirstPage()
  }

  const clearSearch = useCallback(() => {
    setSearch('')
    setSubmitSearch('')
    setFirstPage()
  }, [setFirstPage])

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    if (event.target.value.length === 0) {
      setSubmitSearch('')
      setFirstPage()
    }
  }

  return {
    onSubmit,
    submitSearch,
    QUERY_KEY,
    search,
    page,
    onPreviousPage,
    onNextPage,
    clearSearch,
    onSearch,
  }
}
