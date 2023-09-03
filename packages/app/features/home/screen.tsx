import {
  Anchor,
  Button,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Sheet,
  XStack,
  YStack,
  useToastController,
} from '@t4/ui'
import { ChevronDown } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { Linking } from 'react-native'
import { useLink } from 'solito/link'
import { useSheetOpen } from '../../atoms/sheet'
import { SolitoImage } from 'solito/image'
import { trpc } from 'app/utils/trpc'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
import { useUser } from 'app/utils/supabase/hooks/useUser'

export function HomeScreen() {
  const utils = trpc.useContext()
  const supabase = useSupabase()
  const { user } = useUser()

  const signInLink = useLink({
    href: '/sign-in',
  })

  const signUpLink = useLink({
    href: '/sign-up',
  })

  return (
    <ScrollView>
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" space="$4">
        <SolitoImage src="/t4-logo.png" width={128} height={128} alt="T4 Logo" />
        <H1 textAlign="center">👋 Hello, this is Sterling Saver</H1>
        <Separator />
        <Paragraph textAlign="center" size={'$2'}>
          Sterling Saver is your ultimate companion on the path to financial success. Tailored
          specifically for users in the UK, this powerful personal finance app empowers you to take
          charge of your money effortlessly.
        </Paragraph>

        {user ? (
          <Button
            onPress={async () => {
              supabase.auth.signOut()
              // Clear tanstack query cache of authenticated routes
              utils.auth.secretMessage.reset()
            }}
            space="$2"
          >
            Sign Out
          </Button>
        ) : (
          <XStack space="$2">
            <Button {...signInLink} space="$2">
              Sign In
            </Button>
            <Button {...signUpLink} space="$2">
              Sign Up
            </Button>
          </XStack>
        )}
      </YStack>
    </ScrollView>
  )
}
