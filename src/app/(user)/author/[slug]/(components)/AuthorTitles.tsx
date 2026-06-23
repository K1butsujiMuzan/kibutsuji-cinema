'use client'

import CountAndTitle from '@/components/ui/count-and-title/CountAndTitle'
import { useQuery } from '@tanstack/react-query'
import { getAuthorTitles } from '@/server-actions/author/get-author-titles'
import { QUERY_KEYS } from '@/configs/query-keys.config'
import CountAndTitleLoader from '@/components/ui/count-and-title/CountAndTitleLoader'

interface Props {
  authorSlug: string
}

export default function AuthorTitles({ authorSlug }: Props) {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.AUTHOR_TITLES, authorSlug],
    queryFn: async () => getAuthorTitles(authorSlug),
  })

  if (isPending || data === undefined) {
    return <CountAndTitleLoader className={'w-20'} />
  }

  return <CountAndTitle count={data} text={'Titles'} />
}
