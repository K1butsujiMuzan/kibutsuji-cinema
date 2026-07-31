import type { TTextPageData } from '@/shared/types/text-page.type'

export const privacyPolicyPreface: string[] = [
  '<b>Last Updated:</b> April 8, 2026',
  'This Privacy Policy explains how Kibutsuji collects, uses, discloses, and protects your personal information when you use our website, streaming services, mobile applications, and related features. By accessing or using Kibutsuji, you agree to the terms of this Privacy Policy.',
]

export const privacyPolicyData: TTextPageData[] = [
  {
    label: '1. Information We Collect',
    subparagraphs: [
      {
        label: '1.1. Information You Provide to Us',
        paragraphs: [
          {
            text: 'We collect information you voluntarily provide when you:',
            list: [
              'Create an account (email, password, name)',
              'Purchase a subscription (payment information, billing address)',
              'Contact customer support (email, communication content)',
              'Participate in surveys, promotions, or contests',
            ],
          },
        ],
      },
      {
        label: '1.2. Information Collected Automatically',
        paragraphs: [
          {
            text: 'When you use the Service, we automatically collect:',
            list: [
              '<b>Device information:</b> IP address, device type, operating system, browser type',
              '<b>Usage data:</b> Pages visited, content watched, search queries, watch history',
              '<b>Location data:</b> Approximate geographic location based on IP address',
              '<b>Cookies and similar technologies:</b> To remember preferences and analyze usage',
            ],
          },
        ],
      },
      {
        label: '1.3. Information from Third Parties',
        paragraphs: [
          {
            text: 'We may receive information about you from third-party payment processors, authentication providers, or social media platforms if you choose to connect your account.',
          },
        ],
      },
    ],
  },
  {
    label: '2. How We Use Your Information',
    paragraphs: [
      {
        text: 'We use your information to:',
        list: [
          'Provide, maintain, and improve the Service',
          'Process your subscription payments and manage your account',
          'Recommend content based on your watch history',
          'Communicate with you about updates, offers, and support',
          'Detect and prevent fraud, security incidents, or other harmful activity',
          'Comply with legal obligations',
        ],
      },
    ],
  },
  {
    label: '3. Legal Basis for Processing (for EU/EEA users)',
    paragraphs: [
      {
        text: 'If you are located in the European Economic Area, we process your personal information based on the following legal grounds:',
        list: [
          '<b>Contract performance:</b> To provide the Service you requested',
          '<b>Legitimate interests:</b> To improve the Service, prevent fraud, and communicate with you',
          '<b>Consent:</b> For marketing communications or optional data collection',
          '<b>Legal compliance:</b> To fulfill legal obligations',
        ],
      },
    ],
  },
  {
    label: '4. Sharing Your Information',
    paragraphs: [
      {
        text: 'We do not sell your personal information. We may share your information in the following circumstances:',
        list: [
          '<b>Service providers:</b> With third parties that help us operate the Service (payment processing, hosting, analytics)',
          '<b>Legal requirements:</b> If required by law, court order, or government regulation',
          '<b>Business transfers:</b> In connection with a merger, acquisition, or sale of assets',
          '<b>With your consent:</b> When you authorize us to share your information',
        ],
      },
    ],
  },
  {
    label: '5. Cookies and Tracking Technologies',
    paragraphs: [
      {
        text: 'We use cookies and similar technologies to:',
        list: [
          'Remember your login status and preferences',
          'Analyze how you use the Service',
          'Personalize content and recommendations',
        ],
      },
      {
        text: 'You can control cookies through your browser settings. However, disabling cookies may affect certain features of the Service.',
      },
    ],
  },
  {
    label: '6. Data Retention',
    paragraphs: [
      {
        text: 'We retain your personal information as long as your account is active or as needed to provide the Service. After you close your account, we may retain certain information for legal compliance, fraud prevention, or legitimate business purposes (e.g., payment records for tax purposes).',
      },
    ],
  },
  {
    label: '7. Your Rights',
    paragraphs: [
      {
        text: 'Depending on your jurisdiction, you may have the following rights regarding your personal information:',
        list: [
          '<b>Access:</b> Request a copy of your data',
          '<b>Correction:</b> Correct inaccurate information',
          '<b>Deletion:</b> Request deletion of your data',
          '<b>Restriction:</b> Limit how we use your data',
          '<b>Portability:</b> Receive your data in a structured format',
          '<b>Object:</b> Object to certain processing activities',
          '<b>Withdraw consent:</b> Withdraw previously given consent',
        ],
      },
      {
        text: 'To exercise your rights, please contact us at <b><a class="text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 hover:underline active:text-gray-700 dark:active:text-gray-100 active:underline transition duration-300" href="mailto:privacy@kibutsuji.me">privacy@kibutsuji.me</a></b>.',
      },
    ],
  },
  {
    label: "8. Children's Privacy",
    paragraphs: [
      {
        text: 'The Service is not intended for children under 13 years old. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us, and we will delete it.',
      },
    ],
  },
  {
    label: '9. International Data Transfers',
    paragraphs: [
      {
        text: 'Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have different data protection laws. We take appropriate safeguards to protect your information, such as standard contractual clauses approved by the European Commission.',
      },
    ],
  },
  {
    label: '10. Data Security',
    paragraphs: [
      {
        text: 'We implement reasonable technical and organizational measures to protect your information from unauthorized access, loss, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
      },
    ],
  },
  {
    label: '11. Third-Party Links',
    paragraphs: [
      {
        text: 'The Service may contain links to third-party websites. We are not responsible for the privacy practices of such sites. We encourage you to read the privacy policies of any third-party websites you visit.',
      },
    ],
  },
  {
    label: '12. Changes to This Privacy Policy',
    paragraphs: [
      {
        text: 'We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through the Service. Your continued use of the Service after the changes become effective constitutes your acceptance of the updated Privacy Policy.',
      },
    ],
  },
  {
    label: '13. Contact Us',
    paragraphs: [
      {
        text: 'If you have any questions about this Privacy Policy or our data practices, please contact us at:',
      },
      {
        text: 'Email: <b><a class="text-pink-400 dark:text-pink-200 hover:text-gray-700 dark:hover:text-gray-100 hover:underline active:text-gray-700 dark:active:text-gray-100 active:underline transition duration-300" href="mailto:privacy@kibutsuji.me">privacy@kibutsuji.me</a></b>',
      },
    ],
  },
]
