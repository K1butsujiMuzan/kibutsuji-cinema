'use client'

import { useState } from 'react'
import { cn } from '../../../lib/utils'
import Link from 'next/link'
import { PAGES } from '@/configs/links'
import { premium } from '@/ui/premium/premium.data'

export default function Premium() {
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <div className={'flex flex-col gap-6 md:gap-8 items-center w-full'}>
      <div
        className={
          'grid grid-cols-2 p-3 border border-pink-400 rounded-100 font-semibold'
        }
      >
        <button
          onClick={() => setIsMonthly(true)}
          className={cn('px-6 py-1 transition duration-300 rounded-100', {
            'text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500':
              isMonthly,
          })}
          type="button"
        >
          <span className={'text-sm'}>Monthly</span>
        </button>
        <button
          onClick={() => setIsMonthly(false)}
          className={cn(
            'px-6 py-1 transition duration-300 rounded-100 flex flex-col',
            {
              'text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500':
                !isMonthly,
            },
          )}
          type="button"
        >
          <span className={'text-sm leading-4.5'}>Annually</span>
          <span className={'text-10 text-nowrap'}>Save 25%</span>
        </button>
      </div>
      <div
        className={
          'flex justify-center flex-col md:flex-row mx-auto gap-5 text-center w-full overflow-auto'
        }
      >
        {premium.map((container) => (
          <div
            className={cn(
              'border border-pink-400 px-4.5 pt-5 pb-8 rounded-2xl w-84 mx-auto md:m-0',
              {
                'pt-15': !container.isMostPopular,
              },
            )}
            key={container.title}
          >
            <div className={'flex flex-col mb-5'}>
              {container.isMostPopular && (
                <div className={'flex justify-center gap-2 font-medium mb-4'}>
                  <svg
                    className={'text-pink-400 -rotate-60'}
                    aria-hidden={true}
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M20.92 15.5601C17.28 13.0201 15.49 9.18008 18.63 5.87008C14.89 7.85008 13.73 5.95008 17.76 0.0800781C12.21 5.84008 7.92 4.52008 3.96 0.890078C4.67 2.15008 6.3 5.35008 5.57 6.32008C4.76 7.41008 0.72 5.38008 0 4.93008C4.41 7.65008 5.63 14.0601 1.34 19.2001C4.66 16.3401 10.17 13.9401 10.56 19.9201C11.05 16.5901 13.29 15.4001 15.53 16.6801C13.85 14.6101 15.36 13.2001 20.93 15.5601H20.92Z"
                      fill="#FF5E00"
                    ></path>
                  </svg>
                  <span>MOST POPULAR</span>
                  <svg
                    className={'text-pink-400 -rotate-60'}
                    aria-hidden={true}
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M20.92 15.5601C17.28 13.0201 15.49 9.18008 18.63 5.87008C14.89 7.85008 13.73 5.95008 17.76 0.0800781C12.21 5.84008 7.92 4.52008 3.96 0.890078C4.67 2.15008 6.3 5.35008 5.57 6.32008C4.76 7.41008 0.72 5.38008 0 4.93008C4.41 7.65008 5.63 14.0601 1.34 19.2001C4.66 16.3401 10.17 13.9401 10.56 19.9201C11.05 16.5901 13.29 15.4001 15.53 16.6801C13.85 14.6101 15.36 13.2001 20.93 15.5601H20.92Z"
                      fill="#FF5E00"
                    ></path>
                  </svg>
                </div>
              )}
              <h3 className={'text-32 font-semibold'}>{container.title}</h3>
              {isMonthly && (
                <div className={'text-2xl font-medium'}>
                  {container.cost[0]}
                </div>
              )}
              {!isMonthly && (
                <>
                  <div className={'text-2xl font-medium'}>
                    {container.cost[1]}
                  </div>
                  <div className={'text-xl font-medium opacity-75'}>
                    {container.annually}
                  </div>
                </>
              )}
              <small
                className={'text-10 uppercase opacity-75 font-semibold mb-4'}
              >
                Value Added Tax inclusive
              </small>
              <Link
                href={PAGES.AUTH}
                className={cn(
                  'py-2 border border-pink-400 rounded-md justify-center font-semibold',
                  {
                    'text-white bg-pink-400 hover:bg-pink-450 active:bg-pink-500':
                      container.isMostPopular,
                    'dark:text-white hover:border-pink-450 active:border-pink-500':
                      !container.isMostPopular,
                  },
                )}
              >
                Start a 7-day trial
              </Link>
              <Link
                href={PAGES.AUTH}
                className={
                  'py-2 border border-transparent dark:text-white rounded-md justify-center font-semibold'
                }
              >
                Skip the trial period
              </Link>
            </div>
            <ul className={'w-full text-left flex flex-col gap-2'}>
              {container.advantages.map((advantage) => (
                <li
                  key={advantage}
                  className={'flex gap-2.5 text-sm items-start'}
                >
                  <svg
                    className={'fill-pink-400 shrink-0 mt-0.25'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width={16}
                    height={16}
                    aria-hidden={true}
                  >
                    <path d="M7 12a1 1 0 0 1-.707-.293l-3-3a.999.999 0 1 1 1.414-1.414l2.226 2.226 4.3-5.16a1 1 0 1 1 1.535 1.28l-5 6.001A1 1 0 0 1 7 12"></path>
                  </svg>
                  <p>{advantage}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <small className={'text-center text-xs max-w-167 px-3'}>
        This offer is valid for new subscribers only. Your subscription
        automatically renews after the trial period at the price you selected
        when comparing plans. You can cancel at any time. Restrictions and other
        terms apply, including changes to price, content, and features.
      </small>
    </div>
  )
}
