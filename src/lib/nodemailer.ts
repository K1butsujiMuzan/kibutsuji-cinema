import nodemailer from 'nodemailer'

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
  isPasswordReset: boolean,
) {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    html: isPasswordReset
      ? templates.resetPassword(userEmail, url)
      : templates.emailVerification(userEmail, url),
  })
}

const templates = {
  resetPassword: (userEmail: string, url: string) =>
    `<div style="font-family: sans-serif">
      <p style="padding: 0; margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">Password Reset</p>
      <p style="padding: 0; margin: 0 0 5px 0; text-decoration: none;">Hello, ${userEmail}</p>
      <p style="padding: 0; margin: 0 0 5px 0">To reset your password, follow the link below.</p>
      <a style="margin: 20px 0; font-size: 18px; text-decoration: none; font-weight: bold" href="${url}">${url}</a>
      <p style="padding: 0; margin: 0">If you did not request a password reset, then simply ignore this message.</p>
      </div>`,
  emailVerification: (userEmail: string, url: string) =>
    `<div style="font-family: sans-serif">
      <p style="padding: 0; margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">Email Verification</p>
      <p style="padding: 0; margin: 0 0 5px 0; text-decoration: none;">Hello, ${userEmail}</p>
      <p style="padding: 0; margin: 0 0 5px 0">Welcome to Kibutsuji! Please confirm your email address below to complete registration and access your account.</p>
      <a style="margin: 20px 0; font-size: 18px; text-decoration: none; font-weight: bold" href="${url}">${url}</a>
      <p style="padding: 0; margin: 0">If you haven't registered, just ignore this message.</p>
     </div>`,
} as const
