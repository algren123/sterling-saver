import { router } from './trpc'
import { helloRouter } from './routes/hello'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'
import { essentialsRouter } from './routes/essentials'
import { expensesRouter } from './routes/expenses'
import { incomeRouter } from './routes/income'
import { savingsRouter } from './routes/savings'
import { billsRouter } from './routes/bills'
import { subscriptionsRouter } from './routes/subscriptions'

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  auth: authRouter,
  expenses: expensesRouter,
  essentials: essentialsRouter,
  bills: billsRouter,
  subscriptions: subscriptionsRouter,
  income: incomeRouter,
  savings: savingsRouter,
})

export type AppRouter = typeof appRouter
