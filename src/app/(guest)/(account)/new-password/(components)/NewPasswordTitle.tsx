export default function NewPasswordTitle() {
  return (
    <>
      <h1
        className={
          'text-2xl leading-8 md:text-34 md:leading-11 font-medium mb-5 text-center'
        }
      >
        Create a new password
      </h1>
      <p
        className={
          'md:leading-6.5 md:text-18 max-w-104 text-center font-medium'
        }
      >
        For security, your password must be 6 or more characters long.
      </p>
    </>
  )
}