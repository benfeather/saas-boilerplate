import { timestamp, uuid } from 'drizzle-orm/pg-core'

export const id = uuid().defaultRandom()

export const createdAt = timestamp().defaultNow().notNull()

export const expiresAt = timestamp().notNull()

export const updatedAt = timestamp()
  .defaultNow()
  .notNull()
  .$onUpdate(() => /* @__PURE__ */ new Date())
