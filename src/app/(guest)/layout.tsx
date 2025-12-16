import GuestHeader from '@/layout/GuestHeader'

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
