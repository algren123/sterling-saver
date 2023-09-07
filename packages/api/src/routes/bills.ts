import { parse } from 'valibot'
import { BillsSchema, BillsTable } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { eq } from 'drizzle-orm'

export const billsRouter = router({
  update: protectedProcedure
    .input((raw) => parse(BillsSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.update(BillsTable).set(input).where(eq(BillsTable.email, ctx.user.email))
    }),
})
