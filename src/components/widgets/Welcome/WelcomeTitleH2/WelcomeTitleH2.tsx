type Props = {
  title: string
  titleId?: string
  paragraph?: string
}

export default function WelcomeTitleH2({ title, titleId, paragraph }: Props) {
  return (
    <>
      <h2
        className={'text-28 md:text-54 font-semibold text-center'}
        id={titleId}
      >
        {title}
      </h2>
      {paragraph && (
        <p className={'max-w-180 md:text-18 text-center'}>{paragraph}</p>
      )}
    </>
  )
}
