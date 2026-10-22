import Button from '@/components/ui/button/Button'

interface Props {
  error: string
  onClick: () => void
  disabled: boolean
}

export default function RefetchErrorData({ error, onClick, disabled }: Props) {
  return (
    <div className={'flex flex-col items-center gap-3'}>
      <span className={'text-center text-base md:text-18'}>{error}</span>
      <Button onClick={onClick} disabled={disabled}>
        Retry
      </Button>
    </div>
  )
}
