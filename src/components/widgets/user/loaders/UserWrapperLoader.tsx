import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function UserWrapperLoader() {
  return (
    <div className={'flex flex-col lg:flex-row items-center gap-2 lg:gap-4'}>
      <BlockLoader className={'w-22.5 lg:w-12.5 aspect-square'} />
      <div className={'flex flex-col gap-3 w-40'}>
        <BlockLoader className={'h-4.5 w-full'} />
        <BlockLoader className={'h-3 w-full'} />
      </div>
    </div>
  )
}
