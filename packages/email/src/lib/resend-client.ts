import { log } from 'node:console'
import { env } from '@workspace/env/server'
import type { JSX } from 'react/jsx-runtime'
import { Resend } from 'resend'

export const resendClient = new Resend(env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  component,
}: {
  to: string
  subject: string
  component: JSX.Element
}) {
  const res = await resendClient.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject,
    react: component,
  })

  log('Email sent:', res)

  return res
}
