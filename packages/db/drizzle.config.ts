import { env } from '@workspace/config/env/server'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  casing: 'snake_case',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DB_URL,
  },
  out: './src/migrations',
  schema: './src/schema',
})
