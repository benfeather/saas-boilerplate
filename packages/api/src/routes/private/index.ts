import { router } from '../../lib/client'
import { privateProcedure } from '../../lib/procedures'

export const privateRouter = router({
  data: privateProcedure.query(() => {
    return {
      message: 'This is private data',
    }
  }),
})
