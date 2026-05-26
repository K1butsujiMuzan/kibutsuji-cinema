import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string
  onClear: () => void
  searchValue: string
}

export default function Search({
  inputId,
  onClear,
  searchValue,
  ...rest
}: Props) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={
        'border border-pink-50 dark:border-gray-200 rounded-md flex items-center relative'
      }
    >
      <button aria-label={'search'} className={'p-3 shrink-0'} type={'submit'}>
        <svg
          role={'img'}
          aria-hidden={true}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2936_1341)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.73 12.225C3.585 12.225 1.03551 9.72 1.03551 6.625C1.03551 3.53 3.585 1.02002 6.73 1.02002C9.875 1.02002 12.425 3.53 12.425 6.625C12.425 9.72 9.875 12.225 6.73 12.225ZM15.844 15.125L11.7145 11.06C12.7955 9.885 13.46 8.335 13.46 6.625C13.46 2.965 10.447 0 6.73 0C3.013 0 0 2.965 0 6.625C0 10.28 3.013 13.245 6.73 13.245C8.336 13.245 9.809 12.69 10.966 11.765L15.112 15.845C15.3145 16.045 15.642 16.045 15.844 15.845C16.0465 15.65 16.0465 15.325 15.844 15.125Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2936_1341">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <label className={'sr-only'} htmlFor={inputId}></label>
      <input
        {...rest}
        value={searchValue}
        className={
          'py-2 pr-4 flex-1 outline-none [&::-webkit-search-cancel-button]:hidden'
        }
        id={inputId}
        name={inputId}
        type={'search'}
      />
      {searchValue.length > 0 && (
        <button
          aria-label={'clear'}
          onClick={onClear}
          type="reset"
          className={
            'absolute z-10 right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-pink-100/75 dark:hover:bg-gray-600/75 active:bg-pink-100/75 dark:active:bg-gray-600/75 active:scale-97 transition duration-300'
          }
        >
          <svg
            role={'img'}
            aria-hidden={true}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.6033 3.10322C9.69438 3.00891 9.74477 2.88261 9.74363 2.75151C9.74249 2.62042 9.68991 2.49501 9.59721 2.40231C9.5045 2.3096 9.37909 2.25702 9.248 2.25588C9.1169 2.25474 8.9906 2.30514 8.8963 2.39622L5.9998 5.29272L3.1033 2.39622C3.009 2.30514 2.88269 2.25474 2.7516 2.25588C2.6205 2.25702 2.49509 2.3096 2.40239 2.40231C2.30968 2.49501 2.2571 2.62042 2.25596 2.75151C2.25482 2.88261 2.30522 3.00891 2.3963 3.10322L5.2928 5.99972L2.3963 8.89621C2.34854 8.94234 2.31045 8.99751 2.28425 9.05851C2.25804 9.11951 2.24425 9.18512 2.24367 9.25151C2.24309 9.3179 2.25575 9.38374 2.28089 9.44519C2.30603 9.50664 2.34315 9.56247 2.3901 9.60941C2.43705 9.65636 2.49287 9.69349 2.55432 9.71863C2.61577 9.74377 2.68161 9.75642 2.748 9.75584C2.81439 9.75526 2.88 9.74147 2.941 9.71527C3.002 9.68906 3.05717 9.65097 3.1033 9.60322L5.9998 6.70671L8.8963 9.60322C8.9906 9.69429 9.1169 9.74469 9.248 9.74355C9.37909 9.74241 9.5045 9.68983 9.59721 9.59712C9.68991 9.50442 9.74249 9.37901 9.74363 9.24792C9.74477 9.11682 9.69438 8.99052 9.6033 8.89621L6.7068 5.99972L9.6033 3.10322Z"
              fill="black"
            />
          </svg>
        </button>
      )}
    </form>
  )
}
