import BlockLoader from '@/components/ui/block-loader/BlockLoader'

export default function AuthorLoading() {
  return (
    <main
      className={'p-4 pb-8'}
      role={'status'}
      aria-busy={true}
      aria-live={'polite'}
      aria-label={'author page loading'}
    >
      <div
        className={
          'max-w-370 mx-auto flex flex-col items-center lg:items-start lg:grid lg:grid-cols-[auto_1fr] gap-1 lg:gap-4'
        }
      >
        <BlockLoader className={'h-41 w-29.5 md:h-66 md:w-47 rounded-md'} />
        <div
          className={
            'lg:bg-white lg:dark:bg-gray-800 lg:rounded-lg flex flex-col gap-4 px-4 py-3'
          }
        >
          <div
            className={
              'flex flex-col lg:flex-row justify-between gap-3 lg:gap-1 items-center lg:items-start'
            }
          >
            <div className={'flex flex-col gap-4 items-center lg:items-start'}>
              <BlockLoader className={'w-30 h-5.5 md:h-6.5 rounded-md'} />
              <BlockLoader className={'w-30 h-4.5 rounded-md'} />
            </div>
            <BlockLoader className={'w-30 h-9 rounded-md'} />
          </div>
          <div
            className={
              'flex gap-3 items-center justify-center lg:justify-start'
            }
          >
            <BlockLoader className={'w-20 h-6.75'} />
            <BlockLoader className={'h-6.75 w-30'} />
          </div>
        </div>
      </div>
    </main>
  )
}
