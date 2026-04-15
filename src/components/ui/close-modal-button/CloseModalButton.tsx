import { cn } from '@/lib/utils'

interface Props {
  onClose: () => void
  className?: string
}

export default function CloseModalButton({ onClose, className }: Props) {
  return (
    <button
      className={cn(
        'aspect-square p-1 rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 active:bg-pink-100 dark:active:bg-gray-600 active:scale-97 transition duration-300',
        className,
      )}
      onClick={onClose}
      aria-label={'close'}
      type="button"
    >
      <svg
        aria-hidden={true}
        role={'img'}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7457 3.32805C20.3552 2.93752 19.722 2.93752 19.3315 3.32805L12.0371 10.6224L4.74275 3.32805C4.35223 2.93752 3.71906 2.93752 3.32854 3.32805C2.93801 3.71857 2.93801 4.35174 3.32854 4.74226L10.6229 12.0366L3.32856 19.3309C2.93803 19.7215 2.93803 20.3546 3.32856 20.7452C3.71908 21.1357 4.35225 21.1357 4.74277 20.7452L12.0371 13.4508L19.3315 20.7452C19.722 21.1357 20.3552 21.1357 20.7457 20.7452C21.1362 20.3546 21.1362 19.7215 20.7457 19.331L13.4513 12.0366L20.7457 4.74226C21.1362 4.35174 21.1362 3.71857 20.7457 3.32805Z"
          fill="white"
        />
      </svg>
    </button>
  )
}
