import { checkout, polar, portal } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { db } from '@workspace/db'
import * as schema from '@workspace/db/schema/auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: 'sandbox',
})

export const auth = betterAuth({
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          products: [
            {
              productId: '1a72aa77-590b-4154-9459-f2d41ddda646',
              slug: 'pro',
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
        }),
        portal(),
      ],
    }),
  ],
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  user: {
    deleteUser: {
      enabled: true,
      afterDelete: async (user, request) => {
        await polarClient.customers.deleteExternal({
          externalId: user.id,
        })
      },
    },
  },
})
