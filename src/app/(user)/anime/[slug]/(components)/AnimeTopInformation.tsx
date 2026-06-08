interface Props {
  title: string
  originalTitle: string | null
}

export default function AnimeTopInformation({ title, originalTitle }: Props) {
  return (
    <div>
      <h1 className={'text-2xl font-semibold'}>{title}</h1>
      {originalTitle && <h2 className={'text-18 '}>{originalTitle}</h2>}
    </div>
  )
}
