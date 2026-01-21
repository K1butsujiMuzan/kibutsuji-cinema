import { Logo } from '@/components/ui/logo/Logo'

export default function LoginHeader() {
  return (
    <header
      className={'bg-pink-50/60 dark:bg-gray-750/60 w-full px-3 py-2 shadow-sm'}
    >
      <div className={'flex justify-center'}>
        <Logo />
      </div>
    </header>
  )
}
