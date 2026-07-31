interface Props {
  text: string
  title: string
}

export default function AnimeInformationContainer({ text, title }: Props) {
  return (
    <div
      className={
        'truncate rounded-md px-2.5 py-1.5 flex flex-col hover:bg-pink-70 dark:hover:bg-gray-750 active:bg-pink-70 dark:active:bg-gray-750 transition duration-300'
      }
    >
      <span className={'text-sm truncate'}>{title}</span>
      <span className={'truncate'}>{text}</span>
    </div>
  )
}
