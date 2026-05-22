import { useAddToast } from '@/stores/useToastsStore'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export default function useOnFriendAction(queryKey: QueryKey) {
  const addToast = useAddToast()
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(1)

  const onNextPage = useCallback(
    () => setPage((prevState) => prevState + 1),
    [],
  )
  const onPreviousPage = useCallback(
    () => setPage((prevState) => prevState - 1),
    [],
  )

  const onSuccess = async (data: { error: string | null }) => {
    if (data.error) {
      return addToast({ title: data.error, message: '', isSuccess: false })
    }
    await queryClient.invalidateQueries({ queryKey })
  }

  return {
    onSuccess,
    page,
    onNextPage,
    onPreviousPage,
  }
}
