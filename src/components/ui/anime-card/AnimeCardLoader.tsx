import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function AnimeCardLoader() {
  return (
    <div className={'p-1.5'}>
      <BlockLoader className={'w-full aspect-5/7 rounded-md'} />
      <BlockLoader className={'h-4 mt-3 w-full'} />
      <BlockLoader className={'h-3.5 mt-2 w-[60%]'} />
    </div>
  )
}
