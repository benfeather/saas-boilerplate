import { drizzle } from 'drizzle-orm/node-postgres'
import { z } from 'zod'

const env = z
  .object({
    DATABASE_URL: z.string().min(1, 'Database URL is required'),
  })
  .parse(process.env)

export const db = drizzle(env.DATABASE_URL || '')
