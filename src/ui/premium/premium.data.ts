interface IPremium {
  isMostPopular: boolean
  title: string
  cost: [string, string]
  annually: string
  advantages: string[]
}

export const premium: IPremium[] = [
  {
    isMostPopular: false,
    title: 'Fan',
    cost: ['4.99 USD/per month', '49.99 USD/per year'],
    annually: '4.16 USD/per month',
    advantages: [
      'No ads',
      'Full access to the entire Kibutsuji library',
      'New episodes coming soon after airing in Japan',
      'Kibutsuji Store Bonuses: 5% off select items; deals and early sales; free EU shipping > €75 *',
    ],
  },
  {
    isMostPopular: true,
    title: 'Mega Fan',
    cost: ['9.99 USD/per month', '99.99 USD/per year'],
    annually: '8.33 USD/per month',
    advantages: [
      'No ads, plus access to all content',
      'View on 4 devices simultaneously',
      'Download videos in HD quality',
      'Access to the Kibutsuji Game Vault',
      'Kibutsuji Store Bonuses: 10% off select items; deals and early sales; free EU shipping over €50 *',
    ],
  },
]
