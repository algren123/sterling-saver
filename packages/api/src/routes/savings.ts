import { eq } from 'drizzle-orm'
import { SavingsSchema, SavingsTable } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { parse } from 'valibot'

export const savingsRouter = router({
  getByEmail: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx

    const savings = await db
      .select()
      .from(SavingsTable)
      .where(eq(SavingsTable.email, ctx.user.email))
      .get()

    return savings
  }),
  update: protectedProcedure
    .input((raw) => parse(SavingsSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.update(SavingsTable).set(input).where(eq(SavingsTable.email, ctx.user.email))
    }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const savings = await db.select().from(SavingsTable).all()

    return savings
  }),
})
