import { defineConfig } from 'drizzle-kit'

const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

if (!DB_URL) {
  throw new Error('Missing DB_URL environment variable')
}

export default defineConfig({
  casing: 'snake_case',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL,
  },
  out: './src/migrations',
  schema: './src/schema',
})
