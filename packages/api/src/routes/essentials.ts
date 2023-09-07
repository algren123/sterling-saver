import { parse } from 'valibot'
import { EssentialsSchema, EssentialsTable } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { eq } from 'drizzle-orm'

export const essentialsRouter = router({
  update: protectedProcedure
    .input((raw) => parse(EssentialsSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.update(EssentialsTable).set(input).where(eq(EssentialsTable.email, ctx.user.email))
    }),
})
