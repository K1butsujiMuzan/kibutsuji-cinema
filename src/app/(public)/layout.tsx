import LogoHeader from '@/components/layouts/logo-header/LoginHeader'

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LogoHeader />
      {children}
    </>
  )
}
