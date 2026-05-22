import Button from '@/components/ui/button/Button'
import { memo } from 'react'
import PageChangerIcon from '@/components/icons/PageChangerIcon'

interface Props {
  hasNext: boolean
  isFetching: boolean
  page: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export default memo(function PageChanger({
  hasNext,
  isFetching,
  page,
  onPreviousPage,
  onNextPage,
}: Props) {
  return (
    <div className={'flex gap-4 items-center justify-center'}>
      <Button
        className={'disabled:opacity-50'}
        aria-label={'previous page'}
        disabled={page <= 1 || isFetching}
        onClick={onPreviousPage}
      >
        <PageChangerIcon className={'rotate-180'} />
      </Button>
      <span>{page}</span>
      <Button
        className={'disabled:opacity-50'}
        aria-label={'next page'}
        disabled={!hasNext || isFetching}
        onClick={onNextPage}
      >
        <PageChangerIcon />
      </Button>
    </div>
  )
})
