import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Expenses, Income, Savings } from '@t4/api/src/db/schema'
import { H2, H3, H4, XStack, YStack } from '@t4/ui/src'
import { trpc } from 'app/utils/trpc'

const BudgetReport = () => {
  const [expenses, setExpenses] = React.useState<Expenses>()
  const [income, setIncome] = React.useState<Income>()
  const [savings, setSavings] = React.useState<Savings>()

  const dbIncome = trpc.income.getByEmail.useQuery<Income>()
  const dbExpenses = trpc.expenses.getByEmail.useQuery<Expenses>()
  const dbSavings = trpc.savings.getByEmail.useQuery<Savings>()

  const { essentials, bills, subscriptions } = expenses ?? {}

  const essentialsTotal = essentials
    ? essentials.entertainment + essentials.food + essentials.health
    : 0
  const billsTotal = bills ? bills.councilTax : 0
  const subscriptionsTotal = subscriptions ? subscriptions.netflix : 0
  const expensesTotal = essentialsTotal + billsTotal + subscriptionsTotal
  const remaining = (income?.salary ?? 0) - expensesTotal - (savings?.amount ?? 0)

  useFocusEffect(
    React.useCallback(() => {
      setIncome(dbIncome.data)
      setExpenses(dbExpenses.data)
      setSavings(dbSavings.data)
    }, [dbIncome, dbExpenses, dbSavings])
  )

  return (
    <YStack flex={1} width="100%" paddingHorizontal="$8">
      <XStack justifyContent="space-between">
        <H2>Income</H2>
        <H2>{`£${income?.salary}`}</H2>
      </XStack>

      <XStack justifyContent="space-between">
        <H2>Expenses</H2>
        <H2>{`£${expensesTotal}`}</H2>
      </XStack>

      <XStack justifyContent="space-between">
        <H3>Essentials</H3>
        <H3>{`£${essentialsTotal}`}</H3>
      </XStack>

      <XStack justifyContent="space-between">
        <H4>Entertainment</H4>
        <H4>{`£${essentials?.entertainment}`}</H4>
      </XStack>

      <XStack justifyContent="space-between">
        <H4>Food</H4>
        <H4>{`£${essentials?.food}`}</H4>
      </XStack>

      <XStack justifyContent="space-between">
        <H4>Health</H4>
        <H4>{`£${essentials?.health}`}</H4>
      </XStack>

      <XStack justifyContent="space-between">
        <H3>Bills</H3>
        <H3>{`£${billsTotal}`}</H3>
      </XStack>

      <XStack justifyContent="space-between">
        <H4>Council Tax</H4>
        <H4>{`£${bills?.councilTax}`}</H4>
      </XStack>

      <XStack justifyContent="space-between">
        <H3>Subscriptions</H3>
        <H3>{`£${subscriptionsTotal}`}</H3>
      </XStack>

      <XStack justifyContent="space-between">
        <H4>Netflix</H4>
        <H4>{`£${subscriptions?.netflix}`}</H4>
      </XStack>

      <XStack justifyContent="space-between">
        <H2>Savings</H2>
        <H2>{`£${savings?.amount}`}</H2>
      </XStack>

      <XStack justifyContent="space-between" marginTop="$8" marginBottom="$2">
        <H2>Remaining</H2>
        <H2>{`£${remaining}`}</H2>
      </XStack>
    </YStack>
  )
}

export default BudgetReport
