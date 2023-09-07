import { eq } from 'drizzle-orm'
import { IncomeSchema, IncomeTable } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { parse } from 'valibot'

export const incomeRouter = router({
  getByEmail: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const income = await db
      .select()
      .from(IncomeTable)
      .where(eq(IncomeTable.email, ctx.user.email))
      .get()

    return income
  }),
  update: protectedProcedure
    .input((raw) => parse(IncomeSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.update(IncomeTable).set(input).where(eq(IncomeTable.email, ctx.user.email))
    }),
})
