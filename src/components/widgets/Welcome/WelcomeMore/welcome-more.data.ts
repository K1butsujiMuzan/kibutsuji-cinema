import {
  WelcomeMoreIconAccess,
  WelcomeMoreIconDevices,
  WelcomeMoreIconDownload,
  WelcomeMoreIconEpisodes,
  WelcomeMoreIconOffers,
  WelcomeMoreIconStore,
  WelcomeMoreIconVault,
  WelcomeMoreIconView,
} from '@/components/widgets/Welcome/WelcomeMore/WelcomeMoreIcons'
import type { TWelcomeMoreIconSlide } from '@/components/widgets/Welcome/WelcomeMore/welcome-more.types'

export const sliderIcons: TWelcomeMoreIconSlide[] = [
  {
    icon: WelcomeMoreIconView,
    text: 'View without ads',
  },
  {
    icon: WelcomeMoreIconAccess,
    text: 'Full access to the Kibutsuji library',
  },
  {
    icon: WelcomeMoreIconEpisodes,
    text: 'New episodes coming soon after release in Japan',
  },
  {
    icon: WelcomeMoreIconStore,
    text: 'Get 15% off select items at the Kibutsuji Store',
  },
  {
    icon: WelcomeMoreIconVault,
    text: 'Access to the Kibutsuji Vault',
  },
  {
    icon: WelcomeMoreIconOffers,
    text: 'Exclusive offers and early access to sales',
  },
  {
    icon: WelcomeMoreIconDevices,
    text: 'View on 6 devices simultaneously',
  },
  {
    icon: WelcomeMoreIconDownload,
    text: 'Download HD video',
  },
]
