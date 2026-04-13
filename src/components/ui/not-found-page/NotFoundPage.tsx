import Hime from '@/components/ui/hime/Hime'
import AccentLink from '@/components/ui/accent-link/AccentLink'
import { PAGES } from '@/configs/pages.config'

interface Props {
  text: string
}

export default function NotFoundPage({ text }: Props) {
  return (
    <main className={'p-4 flex flex-col gap-6 justify-center items-center'}>
      <h1 className={'sr-only'}>{text}</h1>
      <div className={'flex flex-col items-center gap-2'}>
        <Hime text={text} type={'sad'} />
      </div>
      <AccentLink text={'Back to main'} href={PAGES.MAIN} />
    </main>
  )
}
