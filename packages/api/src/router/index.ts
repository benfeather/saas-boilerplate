import { publicProcedure, router } from '@workspace/api'
import { adminRouter } from '@workspace/api/router/admin'

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK'
  }),
  admin: adminRouter,
})

export type AppRouter = typeof appRouter
