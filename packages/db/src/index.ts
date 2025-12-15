import { env } from '@workspace/config/env/server'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(env.DB_URL)
