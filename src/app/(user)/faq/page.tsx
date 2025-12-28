import { faqData } from '@/app/(user)/faq/faq.data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Faq',
}

export default function Faq() {
  return (
    <main className={'my-4 flex flex-col gap-5 md:gap-10'}>
      <h1
        className={
          'text-28 md:text-54 leading-9 md:leading-16 text-center font-bold px-8'
        }
      >
        Frequently Asked Questions
      </h1>
      <ul
        className={
          'flex flex-col gap-4 justify-center items-center max-w-192.5 mx-auto !px-8 w-full'
        }
      >
        {faqData.map((item) => (
          <li key={item.question} className={'w-full'}>
            <details className={'group flex flex-col open:gap-3 border-b pb-4'}>
              <summary
                className={
                  'list-none flex justify-between items-center cursor-pointer'
                }
              >
                <h2 className={'text-xl md:text-2xl leading-8 font-medium'}>
                  {item.question}
                </h2>
                <svg
                  role={'img'}
                  aria-hidden={true}
                  className="w-6 h-6 fill-gray-700 dark:fill-gray-100 group-open:hidden shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="add-svg"
                >
                  <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z"></path>
                </svg>
                <svg
                  role={'img'}
                  aria-hidden={true}
                  className="w-6 h-6 fill-gray-700 hidden dark:fill-gray-100 group-open:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 2"
                  data-t="minus-svg"
                >
                  <path d="M16.302 1.857a.856.856 0 1 0 0-1.714L1.758.14a.856.856 0 0 0-.857.857.85.85 0 0 0 .857.857l14.544.002Z"></path>
                </svg>
              </summary>
              <p className={'text-base md:text-18 leading-5.5 font-medium'}>
                {item.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </main>
  )
}
