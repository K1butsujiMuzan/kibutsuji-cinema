import { useAddToast } from '@/stores/useToastsStore'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'

export default function useOnSuccessFriend(queryKey: QueryKey) {
  const addToast = useAddToast()
  const queryClient = useQueryClient()

  return async (data: { error: string | null }) => {
    if (data.error) {
      return addToast({ title: data.error, message: '', isSuccess: false })
    }
    await queryClient.invalidateQueries({ queryKey })
  }
}
