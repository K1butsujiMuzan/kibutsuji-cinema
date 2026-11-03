'use client'

import Button from '@/components/ui/button/Button'
import LoginGoogleIcon from '@/components/ui/login-google/LoginGoogleIcon'
import { useLoginGoogle } from '@/components/ui/login-google/useLoginGoogle'

export default function LoginGoogle() {
  const { onLoginGoogleClick, isLoading } = useLoginGoogle()

  return (
    <Button
      onClick={onLoginGoogleClick}
      variant={'accent'}
      disabled={isLoading}
    >
      <span>Continue with Google</span>
      <LoginGoogleIcon />
    </Button>
  )
}
