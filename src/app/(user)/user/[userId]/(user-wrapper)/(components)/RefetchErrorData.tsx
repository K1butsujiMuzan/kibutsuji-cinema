import Button from '@/components/ui/button/Button'

interface Props {
  error: string
  onClick: () => void
  disabled: boolean
}

export default function RefetchErrorData({ error, onClick, disabled }: Props) {
  return (
    <div className={'flex flex-col items-center'}>
      <span className={'text-xl'}>{error}</span>
      <Button text={'Retry'} onClick={onClick} disabled={disabled} />
    </div>
  )
}
