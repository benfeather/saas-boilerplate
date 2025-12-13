import { log } from 'console'
import type { JSX } from 'react/jsx-runtime'
import { Resend } from 'resend'
import { z } from 'zod'

const env = z
  .object({
    RESEND_API_KEY: z.string().min(1, 'API key is required'),
    RESEND_FROM_EMAIL: z.email('Valid from email is required'),
  })
  .parse(process.env)

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
