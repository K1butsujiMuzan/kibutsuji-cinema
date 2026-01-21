import LoginHeader from '@/components/layouts/login-header/LoginHeader'

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  )
}
