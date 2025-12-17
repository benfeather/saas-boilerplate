import { router } from '../../lib/client'
import { publicProcedure } from '../../lib/procedures'

export const publicRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK'
  }),
})
