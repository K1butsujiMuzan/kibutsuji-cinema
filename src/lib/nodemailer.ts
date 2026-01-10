import nodemailer from 'nodemailer'
import type { TNodemailer } from '@/shared/types/nodemailer.type'
import { NODEMAILER_TEMPLATES } from '@/constants/nodemailer-templates'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
})

export async function sendEmail(
  userEmail: string,
  subject: string,
  url: string,
  typeOfMail: TNodemailer,
) {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    html:
      typeOfMail === 'password-reset'
        ? NODEMAILER_TEMPLATES.resetPassword(userEmail, url)
        : NODEMAILER_TEMPLATES.emailVerification(userEmail, url),
  })
}
