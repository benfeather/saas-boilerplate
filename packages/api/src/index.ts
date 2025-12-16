import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from '@workspace/api/context'

export const t = initTRPC.context<Context>().create()

export const router = t.router

export const mergeRouters = t.mergeRouters

export const publicProcedure = t.procedure

export const privateProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      cause: 'No session',
    })
  }

  return next({
    ctx: {
      session: ctx.session,
      user: ctx.user,
    },
  })
})

export const adminProcedure = privateProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Admin access required',
      cause: 'Insufficient permissions',
    })
  }

  return next({
    ctx: {
      session: ctx.session,
      user: ctx.user,
    },
  })
})
