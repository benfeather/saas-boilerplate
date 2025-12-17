import { TRPCError } from '@trpc/server'
import { procedure } from './client'

export const publicProcedure = procedure

export const privateProcedure = procedure.use(({ ctx, next }) => {
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
