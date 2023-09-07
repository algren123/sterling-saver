import { eq } from 'drizzle-orm'
import { EssentialsTable, BillsTable, SubscriptionsTable, EssentialsSchema } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { parse } from 'valibot'

export const expensesRouter = router({
  getByEmail: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const allEssentials = await db
      .select()
      .from(EssentialsTable)
      .where(eq(EssentialsTable.email, ctx.user.email))
      .get()
    const allBills = await db
      .select()
      .from(BillsTable)
      .where(eq(BillsTable.email, ctx.user.email))
      .get()

    const allSubscriptions = await db
      .select()
      .from(SubscriptionsTable)
      .where(eq(SubscriptionsTable.email, ctx.user.email))
      .get()

    return {
      essentials: allEssentials,
      bills: allBills,
      subscriptions: allSubscriptions,
    }
  }),
})
