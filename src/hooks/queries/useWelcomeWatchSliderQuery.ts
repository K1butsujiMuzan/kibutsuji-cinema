import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/configs/query-keys.config'
import { API_ENDPOINTS } from '@/shared/configs/api-endpoints.config'
import type { TServerResponse } from '@/shared/types/server-response.type'
import type { TAnimeInformation } from '@/shared/types/anime-information.type'

export const useWelcomeWatchSliderQuery = () => {
  const { data, isPending, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.WELCOME_ANIME],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.POPULAR_ANIME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return (await response.json()) as TServerResponse<TAnimeInformation[]>
    },
  })

  return {
    data,
    isPending,
    isFetching,
    isError,
    refetch,
  }
}
