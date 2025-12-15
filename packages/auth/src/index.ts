import { checkout, polar, portal } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { env } from '@workspace/config/env/server'
import { db } from '@workspace/db'
import * as schema from '@workspace/db/schema/auth'
import { sendEmail } from '@workspace/email/lib/resend-client'
import { PasswordReset } from '@workspace/email/templates/password-reset'
import { VerifyEmail } from '@workspace/email/templates/verify-email'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'

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
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: 'Reset your password',
        component: PasswordReset({
          name: user.name,
          url,
        }),
      })
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        component: VerifyEmail({
          name: user.name,
          url,
        }),
      })
    },
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
  trustedOrigins: env.CORS_ORIGINS,
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
