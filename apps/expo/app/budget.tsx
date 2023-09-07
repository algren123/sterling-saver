import { UpdateBudgetScreen } from 'app/features/updateBudget/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Budget Manager',
        }}
      />
      <UpdateBudgetScreen />
    </>
  )
}
