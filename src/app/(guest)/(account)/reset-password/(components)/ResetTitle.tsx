export default function ResetTitle() {
  return (
    <>
      <h1
        className={
          'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-3 md:mb-5 text-center'
        }
      >
        Reset password
      </h1>
      <p
        className={
          'text-sm leading-4.5 md:leading-6 md:text-base max-w-104 text-center font-medium mb-5'
        }
      >
        A password reset link will be sent to your email. Your IP address may be
        logged for security purposes.
      </p>
    </>
  )
}
