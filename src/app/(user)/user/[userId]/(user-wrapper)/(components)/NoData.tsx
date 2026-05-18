interface Props {
  text: string
}

export default function NoData({ text }: Props) {
  return <div className={'text-xl text-center'}>{text}</div>
}
