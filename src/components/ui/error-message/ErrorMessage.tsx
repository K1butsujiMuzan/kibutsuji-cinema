interface Props {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <small className={'text-xs font-semibold py-1 text-red'} role={'alert'}>
      {message}
    </small>
  )
}
