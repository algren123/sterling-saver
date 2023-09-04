import { EssentialsTable } from '../db/schema'
import { router, publicProcedure } from '../trpc'

export const essentialsRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const allEssentials = await db.select().from(EssentialsTable).all()
    return allEssentials
  }),
})
