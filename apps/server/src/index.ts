import { trpcServer } from '@hono/trpc-server'
import { createContext } from '@workspace/api/context'
import { appRouter } from '@workspace/api/router'
import { auth } from '@workspace/auth'
import { env } from '@workspace/env/server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(logger())

app.use(
  '/*',
  cors({
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    origin: env.CORS_ORIGINS,
  }),
)

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (opts, context) => createContext({ context }),
  }),
)

app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw))

app.get('/', (c) => c.text('OK'))

export default {
  port: env.SERVER_PORT,
  fetch: app.fetch,
}
