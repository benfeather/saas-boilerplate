import { checkout, polar, portal } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { db } from '@workspace/db'
import * as schema from '@workspace/db/schema/auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'
import { z } from 'zod'

const env = z
  .object({
    CORS_ORIGIN: z.url().min(1, 'CORS origin is required'),
    POLAR_ACCESS_TOKEN: z.string().min(1, 'Polar access token is required'),
    POLAR_SUCCESS_URL: z.string().min(1, 'Polar success URL is required'),
  })
  .parse(process.env)

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
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
              productId: '7c02e5d9-98cc-4d3d-a872-ce2122a339e2',
              slug: 'pro',
            },
          ],
          successUrl: env.POLAR_SUCCESS_URL,
        }),
        portal(),
      ],
    }),
  ],
  trustedOrigins: env.CORS_ORIGIN.split(','),
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
