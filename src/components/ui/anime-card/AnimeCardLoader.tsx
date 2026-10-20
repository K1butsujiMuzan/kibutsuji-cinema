import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function AnimeCardLoader() {
  return (
    <div className={'p-1.5 flex flex-col'}>
      <BlockLoader className={'w-full flex-1 rounded-md'} />
      <BlockLoader className={'h-4 mt-3 w-full shrink-0'} />
      <BlockLoader className={'h-3.5 mt-2 w-[60%] shrink-0'} />
    </div>
  )
}
