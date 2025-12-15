import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from '@dotenvx/dotenvx'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({
  path: resolve(__dirname, '../../../.env'),
})

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    CORS_ORIGINS: z
      .string()
      .min(1)
      .transform((s) => s.split(',').map((s) => s.trim())),
    DB_HOST: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_PORT: z.coerce.number(),
    DB_URL: z.string().min(1),
    DB_USER: z.string().min(1),
    NODE_ENV: z
      .enum(['development', 'production', 'staging'])
      .default('development'),
    POLAR_ACCESS_TOKEN: z.string().min(1),
    POLAR_ENV: z.enum(['production', 'sandbox']).default('sandbox'),
    POLAR_RETURN_URL: z.string().min(1),
    POLAR_SUCCESS_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.email(),
    ADMIN_PORT: z.coerce.number(),
    SERVER_PORT: z.coerce.number(),
    WEB_PORT: z.coerce.number(),
    APPLE_OAUTH_CLIENT_ID: z.string().min(1),
    APPLE_OAUTH_CLIENT_SECRET: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
  },
})
