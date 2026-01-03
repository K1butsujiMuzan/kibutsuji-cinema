import LoginHeader from '@/layout/login-header/LoginHeader'

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
