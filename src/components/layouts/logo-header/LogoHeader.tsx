import Logo from '@/components/ui/logo/Logo'

export default function LogoHeader() {
  return (
    <header
      className={'sticky z-30 top-0 bg-base-second-bg w-full px-3 shadow-sm'}
    >
      <div className={'flex justify-center'}>
        <Logo className={'py-1.5 md:py-2.5 px-1'} />
      </div>
    </header>
  )
}
