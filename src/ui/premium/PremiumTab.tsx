import { cn } from '@/lib/utils'
import { PremiumAdvantage, PremiumMostPopular } from '@/ui/premium/PremiumIcons'
import type { IPremium } from '@/ui/premium/premium.data'
import PremiumLink from '@/ui/premium/PremiumLink'

interface Props {
  container: IPremium
  isMonthly: boolean
}

export default function PremiumTab({ container, isMonthly }: Props) {
  return (
    <div
      className={cn(
        'border border-pink-400 px-4.5 pt-5 pb-8 rounded-2xl w-84 mx-auto md:m-0',
        {
          'pt-15': !container.isMostPopular,
        },
      )}
    >
      <div className={'flex flex-col mb-5'}>
        {container.isMostPopular && (
          <div className={'flex justify-center gap-2 font-medium mb-4'}>
            <PremiumMostPopular />
            <span className={'uppercase'}>most popular</span>
            <PremiumMostPopular />
          </div>
        )}
        <h3 className={'text-34 leading-11 pb-1 font-bold'}>
          {container.title}
        </h3>
        <div className={'text-2xl font-medium'}>
          {isMonthly ? container.month : container.year}
        </div>
        <div
          className={cn('hidden text-xl leading-6.5 font-medium opacity-75', {
            block: !isMonthly,
          })}
        >
          ( {container.annually} )
        </div>
        <small
          className={
            'text-10 leading-4 uppercase opacity-75 font-semibold mb-4'
          }
        >
          Value Added Tax inclusive
        </small>
        <PremiumLink isMostPopular={container.isMostPopular}>
          Start A 7-Day Trial
        </PremiumLink>
        <PremiumLink isTransparent={true}>Skip The Trial Period</PremiumLink>
      </div>
      <ul className={'w-full text-left flex flex-col gap-3'}>
        {container.advantages.map((advantage) => (
          <li
            key={advantage}
            className={
              'flex gap-2.5 text-sm items-start leading-4.5 font-medium'
            }
          >
            <PremiumAdvantage />
            <p>{advantage}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
