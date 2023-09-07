import React from 'react'
import { YStack, useToastController } from '@t4/ui'
import { SignUpSignInComponent } from '@t4/ui/src/SignUpSignIn'
import { useRouter } from 'solito/router'
import type { Provider } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import { capitalizeWord } from 'app/utils/string'
import { isExpoGo } from 'app/utils/flags'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import jwtDecode from 'jwt-decode'

export const SignInScreen = () => {
  const { replace } = useRouter()
  const supabase = useSupabase()
  const toast = useToastController()

  // TODO: Atm supabase doesn't work with google auth due to the 'nonce' not being raw
  // const onGoogleSignInPress = async () => {
  //   GoogleSignin.configure({
  //     webClientId: '793515848468-0hdgq84luqe2sdnsophrrd6fhtb13aml.apps.googleusercontent.com',
  //     iosClientId: '793515848468-lqlitj6fn0kh4rtu3dd1t2l94g3jlkk3.apps.googleusercontent.com',
  //   })

  //   await GoogleSignin.hasPlayServices()
  //   await GoogleSignin.signIn()
  //   const { accessToken, idToken } = await GoogleSignin.getTokens()

  //   const { nonce } = jwtDecode<any>(idToken!)
  //   const { error } = await supabase.auth.signInWithIdToken({
  //     provider: 'google',
  //     token: idToken,
  //     access_token: accessToken,
  //     nonce: nonce,
  //   })

  //   if (error) {
  //     console.log(error)
  //   }
  // }

  const handleOAuthSignInWithPress = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    })

    if (error) {
      if (!isExpoGo) {
        toast.show(capitalizeWord(provider) + ' sign in failed', {
          description: error.message,
        })
      }
      console.log('OAuth Sign in failed', error)
      return
    }

    replace('/')
  }

  const handleEmailSignInWithPress = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      const isExpoGo = Constants.appOwnership === 'expo'
      if (!isExpoGo) {
        toast.show('Sign in failed', {
          description: error.message,
        })
      }
      return
    }

    replace('/')
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  )
}
