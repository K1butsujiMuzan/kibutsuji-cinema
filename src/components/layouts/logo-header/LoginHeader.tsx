import { Logo } from '@/components/ui/logo/Logo'

export default function LogoHeader() {
  return (
    <header
      className={
        'sticky z-30 top-0 bg-pink-50 dark:bg-gray-750 w-full px-3 py-2 shadow-sm'
      }
    >
      <div className={'flex justify-center'}>
        <Logo />
      </div>
    </header>
  )
}
