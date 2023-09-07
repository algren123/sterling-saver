import React from 'react'
import { Income, Savings } from '@t4/api/src/db/schema'
import { Button, H2, H3, H4, Input, XStack, YStack } from '@t4/ui/src'
import { trpc } from 'app/utils/trpc'
import { useUser } from 'app/utils/supabase/hooks/useUser'

export const UpdateBudgetScreen = () => {
  const { user } = useUser()
  const expenses = trpc.expenses.getByEmail.useQuery()
  const { essentials, bills, subscriptions } = expenses.data ?? {}
  const { data: income } = trpc.income.getByEmail.useQuery<Income>()
  const { data: savings } = trpc.savings.getByEmail.useQuery<Savings>()

  const incomeMutation = trpc.income.update.useMutation()

  const [newIncome, setNewIncome] = React.useState(income)
  // const [newEntertainment, setNewEntertainment] = React.useState<number>(
  //   essentials?.entertainment || 0
  // )
  // const [newFood, setNewFood] = React.useState<number>(essentials?.food || 0)
  // const [newHealth, setNewHealth] = React.useState<number>(essentials?.health || 0)
  // const [newCouncilTax, setNewCouncilTax] = React.useState<number>(bills?.councilTax || 0)
  // const [newNetflix, setNewNetflix] = React.useState<number>(subscriptions?.netflix || 0)
  // const [newSavings, setNewSavings] = React.useState<number>(savings?.amount || 0)

  const updateIncomeTable = async () => {
    if (user?.email && newIncome) {
      incomeMutation.mutate(newIncome)
    }
  }

  // const updateEssentialsTable = () => {
  //   const mutation = trpc.essentials.update.useMutation()

  //   if (user?.email) {
  //     mutation.mutate({
  //       email: user.email,
  //       entertainment: newEntertainment,
  //       food: newFood,
  //       health: newHealth,
  //     })
  //   }
  // }

  // const updateBillsTable = () => {
  //   const mutation = trpc.bills.update.useMutation()

  //   if (user?.email) {
  //     mutation.mutate({ email: user.email, councilTax: newCouncilTax })
  //   }
  // }

  return (
    <YStack flex={1} width="100%" paddingHorizontal="$8">
      <YStack>
        <H2>Income</H2>
        <H3>Salary</H3>
        <Input
          borderWidth="$2"
          onChangeText={(text) =>
            setNewIncome((prevState) => ({ ...prevState, salary: Number(text) }))
          }
        />
        <H3>Other</H3>
        <Input
          borderWidth="$2"
          onChangeText={(text) => {
            setNewIncome((prevState) => ({ ...prevState, other: Number(text) }))
          }}
        />

        <Button
          onPress={() => {
            updateIncomeTable()
          }}
        >
          Update
        </Button>
      </YStack>
    </YStack>
  )
}
