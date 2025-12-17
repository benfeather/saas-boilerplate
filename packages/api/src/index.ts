import { auth } from '@workspace/auth'
import type { Context as HonoContext } from 'hono'
import { router } from './lib/client'
import { adminRouter } from './routes/admin'
import { privateRouter } from './routes/private'
import { publicRouter } from './routes/public'

export const appRouter = router({
  admin: adminRouter,
  private: privateRouter,
  public: publicRouter,
})

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })

  return {
    ...session,
  }
}

export type AppRouter = typeof appRouter

export type CreateContextOptions = {
  context: HonoContext
}

export type Context = Awaited<ReturnType<typeof createContext>>
