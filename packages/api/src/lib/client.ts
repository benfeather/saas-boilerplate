import { initTRPC } from '@trpc/server'
import type { Context } from '@workspace/api'

export const { mergeRouters, middleware, procedure, router } = initTRPC
  .context<Context>()
  .create()
