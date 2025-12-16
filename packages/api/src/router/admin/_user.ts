import { adminProcedure, router } from '@workspace/api'
import { auth } from '@workspace/auth'
import { z } from 'zod'

export const userRouter = router({
  list: adminProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
    )
    .query(async (opts) => {
      const { limit = 10, offset = 0 } = opts.input

      const { users, total } = await auth.api.listUsers({
        query: {
          limit,
          offset,
        },
      })

      return { users, total }
    }),
})
