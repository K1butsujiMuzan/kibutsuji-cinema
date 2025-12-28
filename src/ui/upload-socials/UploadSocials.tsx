import { uploadSocials } from '@/ui/upload-socials/upload-socials.data'

export default function UploadSocials() {
  return (
    <div className={'flex justify-center gap-4 md:gap-5 flex-wrap'}>
      {uploadSocials.map(({ href, icon: Icon, text }) => (
        <a
          target={'_blank'}
          href={href}
          key={text}
          className={
            'bg-pink-100 dark:bg-gray-600 hover:bg-pink-50 hover:dark:bg-gray-750 active:bg-pink-50 active:dark:bg-gray-750 flex items-center gap-1 justify-between w-40 py-1 px-2.5 rounded-sm transition duration-300'
          }
        >
          <Icon />
          <div className={'flex flex-col'}>
            <span className={'text-xs leading-4.5'}>Upload to</span>
            <span className={'leading-6'}>{text}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
