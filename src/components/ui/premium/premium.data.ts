import type { TPremiumTabPanel } from '@/components/ui/premium/premium.types'

export const premiumTabPanels: TPremiumTabPanel[] = [
  {
    isMostPopular: false,
    title: 'Fan',
    monthly: 4.99,
    yearly: 44.88,
    yearlyPerMonth: 3.74,
    advantages: [
      'No ads',
      'Full access to the entire Kibutsuji library',
      'New episodes shortly after airing in Japan',
      '5% off selected items in the Kibutsuji Store',
      'Exclusive deals and early sales',
      'Free EU shipping on orders over €75*',
    ],
  },
  {
    isMostPopular: true,
    title: 'Mega Fan',
    monthly: 9.99,
    yearly: 89.88,
    yearlyPerMonth: 7.49,
    advantages: [
      'No ads and full access to all content',
      'Watch on 4 devices simultaneously',
      'Download videos in HD quality',
      'Access to the Kibutsuji Game Vault',
      '10% off selected items in the Kibutsuji Store',
      'Exclusive deals and early sales',
      'Free EU shipping on orders over €50*',
    ],
  },
  {
    isMostPopular: false,
    title: 'Ultra Fan',
    monthly: 14.99,
    yearly: 134.88,
    yearlyPerMonth: 11.24,
    advantages: [
      'No ads and unlimited access to all content',
      'Watch on 6 devices simultaneously',
      'Stream videos in up to 4K quality',
      'Download videos for offline viewing',
      'Full access to the Kibutsuji Game Vault',
      'Exclusive behind-the-scenes and bonus content',
      'Priority customer support',
      '15% off selected items in the Kibutsuji Store',
      'Exclusive deals and early sales',
      'Free EU shipping on orders over €50*',
    ],
  },
]

export const premiumTabs: string[] = premiumTabPanels.map((item) => item.title)
