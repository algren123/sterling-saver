import { router } from './trpc'
import { helloRouter } from './routes/hello'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'
import { essentialsRouter } from './routes/essentials'

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  auth: authRouter,
  essentials: essentialsRouter,
})

export type AppRouter = typeof appRouter
