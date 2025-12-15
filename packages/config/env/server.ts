import { config } from '@dotenvx/dotenvx'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

config({
  path: '../../.env',
})

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    CORS_ORIGINS: z
      .string()
      .min(1)
      .transform((str) => str.split(',')),
    DB_HOST: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_PORT: z.coerce.number(),
    DB_URL: z.string().min(1),
    DB_USER: z.string().min(1),
    POLAR_ACCESS_TOKEN: z.string().min(1),
    POLAR_SUCCESS_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.email(),
    SERVER_PORT: z.coerce.number(),
    WEB_PORT: z.coerce.number(),
  },
})
