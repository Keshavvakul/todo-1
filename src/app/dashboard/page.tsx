import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { getCurrentUser } from '@/lib/auth'
import { getUserTodos } from '@/lib/actions/todos'
import DashboardClient from './DashboardClient'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  // Prevent static generation
  noStore()
  
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  const { todos } = await getUserTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a1a] to-[#0a0a1a] p-8">
      <DashboardClient user={user} initialTodos={todos} />
    </div>
  )
}
