'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getAuthorSubscribers } from '@/server-actions/author/get-author-subscribers'
import CountAndTitle from '@/components/ui/count-and-title/CountAndTitle'
import CountAndTitleLoader from '@/components/ui/count-and-title/CountAndTitleLoader'

interface Props {
  authorSlug: string
}

export default function AuthorSubscribers({ authorSlug }: Props) {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.AUTHOR_SUBSCRIBERS, authorSlug],
    queryFn: async () => getAuthorSubscribers(authorSlug),
  })

  if (isPending || data === undefined) {
    return <CountAndTitleLoader />
  }

  return <CountAndTitle count={data} text={'Subscribers'} />
}
