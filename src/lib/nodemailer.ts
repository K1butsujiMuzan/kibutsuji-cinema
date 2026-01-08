import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail(
  userEmail: string,
  subject: string,
  url: string,
) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    html: `
      <div style="font-family: sans-serif">
        <p style="padding: 0; margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">Password Reset</p>
        <p style="padding: 0; margin: 0 0 5px 0;">Hello, ${userEmail}</p>
        <p style="padding: 0; margin: 0 0 5px 0">To reset your password, follow the link below.</p>
        <a style="margin: 20px 0; display: inline-block; auto; background: #0076fe; font-size: 18px; color: white; padding: 8px 32px; text-decoration: none; border-radius: 12px; font-weight: bold" href="${url}">Reset the password</a>
        <p style="padding: 0; margin: 0">If you did not request a password reset, then simply ignore this message.</p>
      </div>
    `,
  })
}
