'use client'

import {useSession} from "@/lib/auth-client";

export default function Home() {
  const { data: session } = useSession()

  console.log(session)

  return <>
    <p>Привет, {session?.user && session.user.email}</p>
  </>
}
