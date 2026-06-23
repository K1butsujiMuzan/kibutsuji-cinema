'use client'

import type { TErrorResponse } from '@/shared/types/error-response.type'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import { useAddToast } from '@/stores/useToastsStore'

export const useOnSuccess = () => {
  const addToast = useAddToast()
  const queryClient = useQueryClient()

  const onSuccess = async (data: TErrorResponse, queryKey: QueryKey) => {
    if (data.error) {
      return addToast({
        title: data.error,
        isSuccess: false,
        message: '',
      })
    }
    await queryClient.invalidateQueries({ queryKey })
  }

  return { onSuccess }
}
