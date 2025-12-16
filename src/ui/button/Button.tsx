import type { ButtonHTMLAttributes } from 'react'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button(props: Props) {
  return (
    <button
      {...props}
      className={
        'text-white flex items-center gap-1.5 md:gap-3 px-2.5 md:px-3 py-2 md:py-4 rounded-md bg-pink-400 hover:bg-pink-450 active:bg-pink-500 active:scale-97 transition duration-300'
      }
    >
      <span className={'text-sm md:text-3xl font-semibold'}>
        {props.children}
      </span>
      <svg
        className={'md:w-3.5 h-5'}
        aria-hidden={true}
        width="8"
        height="11"
        viewBox="0 0 8 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_231_743)">
          <path
            d="M5.98679 5.70599C6.02755 5.66516 6.06088 5.61054 6.0839 5.54682C6.10693 5.4831 6.11896 5.4122 6.11896 5.34021C6.11896 5.26823 6.10693 5.19732 6.0839 5.1336C6.06088 5.06988 6.02755 5.01526 5.98679 4.97444L2.00978 0.969617C1.96391 0.923261 1.91018 0.896077 1.85443 0.891018C1.79869 0.88596 1.74305 0.903218 1.69357 0.940922C1.6441 0.978625 1.60267 1.03533 1.57379 1.10487C1.54492 1.17442 1.5297 1.25415 1.52979 1.33539L1.52979 9.34503C1.53002 9.42609 1.54543 9.50552 1.57438 9.57479C1.60332 9.64405 1.6447 9.70053 1.69406 9.73814C1.74343 9.77576 1.79891 9.79309 1.85453 9.78827C1.91016 9.78346 1.96383 9.75668 2.00978 9.71081L5.98679 5.70599Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_231_743">
            <rect
              width="10.6795"
              height="7.34217"
              fill="white"
              transform="matrix(0 -1 1 0 0 10.6797)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}
