import { Resend } from 'resend'
import { z } from 'zod'

const env = z
  .object({
    RESEND_API_KEY: z.string().min(1, 'API key is required'),
    RESEND_FROM_EMAIL: z.email('Valid from email is required'),
  })
  .parse(process.env)

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject,
    html,
  })
}
