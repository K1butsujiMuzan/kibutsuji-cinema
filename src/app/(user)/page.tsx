import {getServerSession} from "@/lib/get-session";

export default async function Home() {
  const session = await getServerSession()
  const user = session?.user

  if(!user) {
    return <>Sign in to continue</>
  }

  return <>
    {user.email}
  </>
}
