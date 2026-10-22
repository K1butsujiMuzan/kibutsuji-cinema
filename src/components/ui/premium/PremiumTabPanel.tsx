import type { TPremiumTabPanel } from '@/components/ui/premium/premium.types'
import {
  PremiumCrownIcon,
  PremiumAdvantageIcon,
} from '@/components/ui/premium/PremiumIcons'
import { cn } from '@/lib/utils'
import AccentLink from '@/components/ui/accent-link/AccentLink'

type Props = {
  isSelected: boolean
  tabId: string
  panelId: string
} & TPremiumTabPanel

export default function PremiumTabPanel({
  tabId,
  panelId,
  isSelected,
  title,
  isMostPopular,
  monthly,
  yearly,
  yearlyPerMonth,
  advantages,
}: Props) {
  return (
    <div
      role={'tabpanel'}
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={cn(
        'hidden flex-col items-center gap-3 p-3 border border-pink-400 rounded-2xl',
        {
          flex: isSelected,
        },
      )}
    >
      {isMostPopular && (
        <div
          className={
            'flex flex-col gap-2 items-center uppercase text-sm text-pink-400 dark:text-pink-200'
          }
        >
          <PremiumCrownIcon />
          <span>Most popular</span>
        </div>
      )}
      <h3 className={'text-2xl md:text-40 font-semibold text-center'}>
        {title}
      </h3>
      <span className={'text-xs uppercase'}>Value Added Tax inclusive</span>
      <span className={'flex flex-col text-center'}>
        <span className={'text-xl md:text-28 font-medium'}>
          {monthly} USD/per month
        </span>
        <span className={'text-18 md:text-xl'}>
          <span>or </span>
          <span className={'text-pink-400 dark:text-pink-200'}>
            save 25% with annual billing
          </span>
        </span>
        <span className={'flex flex-col'}>
          <span className={'text-xl md:text-28 font-medium'}>
            {yearly} USD/per year
          </span>
          <span className={'text-18 md:text-xl'}>
            ({yearlyPerMonth} USD/per month)
          </span>
        </span>
      </span>
      <AccentLink href={'#'} className={'w-full'}>
        Choose {title}
      </AccentLink>
      <ul className={'flex flex-col gap-2'}>
        {advantages.map((item, index) => (
          <li key={`paragraph-${index}`} className={'flex items-center gap-1'}>
            <span
              className={
                'flex items-center justify-center p-0.5 rounded-full border border-pink-400'
              }
            >
              <PremiumAdvantageIcon />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
