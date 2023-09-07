import React from 'react'
import { Button, H1, Paragraph, ScrollView, Separator, XStack, YStack } from '@t4/ui'
import { useLink } from 'solito/link'
import { trpc } from 'app/utils/trpc'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
import { useUser } from 'app/utils/supabase/hooks/useUser'
import { Platform } from 'react-native'
import BudgetReport from '../../../components/report'

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

  const dataFetchingLink = useLink({ href: '/data-fetching' })

  return (
    <ScrollView>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal={Platform.OS === 'web' ? '$20' : '$4'}
        paddingVertical="$8"
        space="$4"
      >
        <H1 textAlign="center">
          {!user
            ? '👋 Hello, this is Sterling Saver'
            : user.user_metadata?.name
            ? `👋 Hello, ${user?.user_metadata.name.split(' ')[0]}`
            : '👋 Welcome back'}
        </H1>
        <Separator />
        {!user ? (
          <Paragraph textAlign="center" size={'$8'}>
            Sterling Saver is your ultimate companion on the path to financial success. Tailored
            specifically for users in the UK, this powerful personal finance app empowers you to
            take charge of your money effortlessly.
          </Paragraph>
        ) : null}

        {user ? (
          <>
            <BudgetReport />
            <XStack space="$2">
              <Button {...budgetLink} space="$2">
                Update Budget
              </Button>
              <Button {...dataFetchingLink} space="$2">
                Data Fetching
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
          </>
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
