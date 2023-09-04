import { Button, H1, Paragraph, ScrollView, Separator, XStack, YStack } from '@t4/ui'
import React from 'react'
import { useLink } from 'solito/link'
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

  const budgetLink = useLink({ href: '/budget' })

  return (
    <ScrollView>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$20"
        paddingVertical="$8"
        space="$4"
      >
        <H1 textAlign="center">
          👋 Hello,{' '}
          {user?.user_metadata.name
            ? user?.user_metadata.name.split(' ')[0]
            : 'this is Sterling Saver'}
        </H1>
        <Separator />
        <Paragraph textAlign="center" size={'$8'}>
          Sterling Saver is your ultimate companion on the path to financial success. Tailored
          specifically for users in the UK, this powerful personal finance app empowers you to take
          charge of your money effortlessly.
        </Paragraph>

        {user ? (
          <XStack space="$2">
            <Button {...budgetLink} space="$2">
              Budget Tracker
            </Button>
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
          </XStack>
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
