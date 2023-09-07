import { parse } from 'valibot'
import { SubscriptionsSchema, SubscriptionsTable } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { eq } from 'drizzle-orm'

export const subscriptionsRouter = router({
  update: protectedProcedure
    .input((raw) => parse(SubscriptionsSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db
        .update(SubscriptionsTable)
        .set(input)
        .where(eq(SubscriptionsTable.email, ctx.user.email))
    }),
})
