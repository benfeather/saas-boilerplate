import { trpcServer } from '@hono/trpc-server'
import { createContext } from '@workspace/api/context'
import { appRouter } from '@workspace/api/router/index'
import { auth } from '@workspace/auth'
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
    origin: process.env.CORS_ORIGIN || '',
  }),
)

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (opts, context) => createContext({ context }),
  }),
)

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))

app.get('/', (c) => c.text('OK'))

export default app
