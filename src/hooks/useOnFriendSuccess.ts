import { useAddToast } from '@/stores/useToastsStore'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export default function useOnFriendSuccess(queryKey: QueryKey) {
  const addToast = useAddToast()
  const queryClient = useQueryClient()

  return useCallback(
    async (data: { error: string | null }) => {
      if (data.error) {
        return addToast({ title: data.error, message: '', isSuccess: false })
      }
      await queryClient.invalidateQueries({ queryKey })
    },
    [queryKey],
  )
}
