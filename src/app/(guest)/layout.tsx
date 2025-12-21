import GuestHeader from '@/layout/guest-header/GuestHeader'

export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <GuestHeader />
      {children}
    </>
  )
}
