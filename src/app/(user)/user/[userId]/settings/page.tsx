import type { Metadata } from 'next'
import { getServerSession } from '@/lib/get-server-session'
import { redirect } from 'next/navigation'
import { PAGES } from '@/configs/pages.config'

export const metadata: Metadata = {
  title: 'User settings',
}

export default async function Settings({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const session = await getServerSession()

  if (!session) {
    return redirect(PAGES.LOGIN)
  }

  if (session && session.user.id !== userId) {
    return redirect(PAGES.USER(session.user.id))
  }

  return <main className={'p-4'}>Settings</main>
}
