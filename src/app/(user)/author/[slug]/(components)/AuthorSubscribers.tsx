'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import { getAuthorSubscribers } from '@/server-actions/author/get-author-subscribers'
import CountAndTitle from '@/components/ui/count-and-title/CountAndTitle'
import BlockLoader from '@/components/ui/block-loader/BlockLoader'

interface Props {
  authorSlug: string
}

export default function AuthorSubscribers({ authorSlug }: Props) {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.AUTHOR_SUBSCRIBERS, authorSlug],
    queryFn: async () => getAuthorSubscribers(authorSlug),
  })

  if (isPending || data === undefined) {
    return <BlockLoader className={'h-6.75 w-30'} />
  }

  return <CountAndTitle count={data} text={'Subscribers'} />
}
