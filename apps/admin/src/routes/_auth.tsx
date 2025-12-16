import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '@workspace/common/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import { getUser } from '@/functions/get-user'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUser()

    if (!session?.user || session.user.role !== 'admin') {
      throw redirect({
        to: '/',
      })
    }

    return {
      session,
    }
  },
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
