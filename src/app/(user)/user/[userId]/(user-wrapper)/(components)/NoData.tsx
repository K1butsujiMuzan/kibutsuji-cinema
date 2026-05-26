interface Props {
  text: string
}

export default function NoData({ text }: Props) {
  return <div className={'py-5 md:py-10 text-xl text-center'}>{text}</div>
}
