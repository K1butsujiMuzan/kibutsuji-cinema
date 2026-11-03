import { useState } from 'react'
import { useAddToast } from '@/stores/useToastsStore'
import { signIn } from '@/lib/auth-client'
import { PAGES } from '@/shared/configs/pages.config'
import { ERRORS } from '@/shared/configs/errors.config'

export const useLoginGoogle = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const addToast = useAddToast()

  const onLoginGoogleClick = async () => {
    try {
      setIsLoading(true)
      const response = await signIn.social({
        provider: 'google',
        callbackURL: PAGES.MAIN,
      })
      if (response.error) {
        console.error(response.error.message || ERRORS.PROVIDER_FAILED)
        addToast({
          isSuccess: false,
          title: ERRORS.PROVIDER_FAILED,
          message: '',
        })
      }
    } catch (error) {
      console.error(ERRORS.SOMETHING_WRONG, error)
      addToast({
        isSuccess: false,
        title: ERRORS.SOMETHING_WRONG,
        message: '',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    onLoginGoogleClick,
    isLoading,
  }
}
