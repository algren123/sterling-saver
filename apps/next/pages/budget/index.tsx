import { BudgetScreen } from 'app/features/budget/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Budget Tracker</title>
      </Head>
      <BudgetScreen />
    </>
  )
}
