import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '@workspace/common/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import { getUser } from '@/functions/get-user'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { user, session } = await getUser()

    if (!user || user.role !== 'admin') {
      throw redirect({
        to: '/',
      })
    }

    return {
      user,
      session,
    }
  },
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <main className="flex-1">
        <SidebarTrigger />

        <div className="mx-auto max-w-7xl px-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
