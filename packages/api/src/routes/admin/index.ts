import { router } from '../../lib/client'
import { userRouter } from './_user'

export const adminRouter = router({
  user: userRouter,
})
