import { YStack, useToastController } from '@t4/ui'
import { useRouter } from 'solito/router'
import { SignUpSignInComponent } from '@t4/ui/src/SignUpSignIn'
import type { Provider } from '@supabase/supabase-js'
import { capitalizeWord } from 'app/utils/string'
import { isExpoGo } from 'app/utils/flags'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'

export const SignUpScreen = () => {
  const { push } = useRouter()
  const toast = useToastController()
  const supabase = useSupabase()

  const handleOAuthSignInWithPress = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: provider })

    if (error) {
      if (!isExpoGo) {
        toast.show(capitalizeWord(provider) + ' sign up failed', {
          description: error.message,
        })
      }

      return
    }

    push('/')
  }

  const handleEmailSignUpWithPress = async (emailAddress: string, password: string) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ email: emailAddress, password })

    if (error) {
      if (!isExpoGo) {
        toast.show('Sign up failed', {
          description: error.message,
        })
      }
    } else if (user) {
      if (!isExpoGo) {
        toast.show('Email Confirmation Link', {
          description: 'Check your email for a confirmation link.',
        })
      }
    }

    push('/')
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignUpWithPress}
      />
    </YStack>
  )
}
