'use client'
import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react'

export default function useSearch() {
  const [search, setSearch] = useState<string>('')
  const [submitSearch, setSubmitSearch] = useState<string>('')

  const clearSearch = useCallback(() => {
    setSearch('')
    setSubmitSearch('')
  }, [])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitSearch(search)
  }

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    if (event.target.value.length === 0) {
      setSubmitSearch('')
    }
  }

  return {
    clearSearch,
    search,
    submitSearch,
    onSubmit,
    onSearch,
  }
}
