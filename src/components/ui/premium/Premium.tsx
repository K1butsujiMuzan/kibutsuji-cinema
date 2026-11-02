'use client'

import { useTab } from '@/hooks/useTab'
import Button from '@/components/ui/button/Button'
import {
  premiumTabPanels,
  premiumTabs,
} from '@/components/ui/premium/premium.data'
import PremiumTabPanel from '@/components/ui/premium/PremiumTabPanel'

type Props = {
  titleId: string
}

export default function Premium({ titleId }: Props) {
  const { currentTab, tabId, tabsRef, onTabListKeyDown, onTabClick, panelId } =
    useTab(premiumTabPanels.length)

  return (
    <div className={'flex flex-col gap-5 items-center w-full'}>
      <div
        aria-labelledby={titleId}
        role={'tablist'}
        onKeyDown={onTabListKeyDown}
        className={'flex gap-2 p-3 border border-accent rounded-4xl'}
      >
        {premiumTabs.map((item, index) => {
          const isCurrent = currentTab === index

          return (
            <Button
              key={item}
              onClick={() => onTabClick(index)}
              role={'tab'}
              id={`${tabId}${index}`}
              aria-controls={`${panelId}${index}`}
              aria-selected={isCurrent}
              tabIndex={isCurrent ? 0 : -1}
              ref={(element: HTMLButtonElement) => {
                tabsRef.current[index] = element
              }}
              variant={isCurrent ? 'accent' : 'normal'}
              className={'rounded-4xl px-4'}
            >
              {item}
            </Button>
          )
        })}
      </div>
      {premiumTabPanels.map((item, index) => (
        <PremiumTabPanel
          key={item.title}
          isSelected={currentTab === index}
          tabId={`${tabId}${index}`}
          panelId={`${panelId}${index}`}
          isMostPopular={item.isMostPopular}
          title={item.title}
          monthly={item.monthly}
          yearly={item.yearly}
          yearlyPerMonth={item.yearlyPerMonth}
          advantages={item.advantages}
        />
      ))}
      <small className={'text-center text-xs max-w-167.5'}>
        This offer is valid for new subscribers only. Your subscription
        automatically renews after the trial period at the price you selected
        when comparing plans. You can cancel at any time. Restrictions and other
        terms apply, including changes to price, content, and features.
      </small>
    </div>
  )
}
