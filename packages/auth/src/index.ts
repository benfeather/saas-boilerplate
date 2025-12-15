import { checkout, polar } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { env } from '@workspace/config/env/server'
import { db } from '@workspace/db'
import * as schema from '@workspace/db/schema'
import { sendEmail } from '@workspace/email/lib/resend-client'
import { PasswordReset } from '@workspace/email/templates/password-reset'
import { VerifyAccount } from '@workspace/email/templates/verify-account'
import { VerifyEmailChange } from '@workspace/email/templates/verify-email-change'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: env.POLAR_ENV,
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
        component: VerifyAccount({
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
          returnUrl: env.POLAR_RETURN_URL,
        }),
      ],
    }),
  ],
  trustedOrigins: env.CORS_ORIGINS,
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async (
        { user, newEmail, url, token },
        request,
      ) => {
        void sendEmail({
          to: newEmail,
          subject: 'Confirm your new email address',
          component: VerifyEmailChange({
            name: user.name,
            url,
          }),
        })
      },
      updateEmailWithoutVerification: false,
    },
    deleteUser: {
      enabled: true,
      afterDelete: async (user, request) => {
        await polarClient.customers.deleteExternal({
          externalId: user.id,
        })
      },
    },
  },
  socialProviders: {
    apple: {
      clientId: env.APPLE_OAUTH_CLIENT_ID,
      clientSecret: env.APPLE_OAUTH_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  },
})
