import { router } from '@workspace/api'
import { userRouter } from './_user'

export const adminRouter = router({
  user: userRouter,
})
