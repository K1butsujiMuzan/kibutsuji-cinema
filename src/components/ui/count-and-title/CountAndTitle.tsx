interface Props {
  count: number
  text: string
}

export default function CountAndTitle({ count, text }: Props) {
  return (
    <span className={'flex gap-1.5 items-center'}>
      <span className={'text-18 font-medium'}>{count}</span>
      <span className={'text-gray-650 dark:text-gray-150'}>{text}</span>
    </span>
  )
}
