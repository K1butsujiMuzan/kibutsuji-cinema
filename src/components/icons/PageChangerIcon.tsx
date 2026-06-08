import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function PageChangerIcon({ className }: Props) {
  return (
    <svg
      className={cn('shrink-0', className)}
      role={'img'}
      aria-hidden={true}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.88965 0L4.5 1.40536L12.7612 10.0131L11.8804 10.9312L11.8848 10.9261L4.54443 18.5734L5.91406 20C7.94284 17.8864 13.6068 11.9855 15.5 10.0131C14.0939 8.54721 15.4651 9.97579 5.88965 0Z"
        fill="white"
      />
    </svg>
  )
}
