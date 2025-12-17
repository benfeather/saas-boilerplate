import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@workspace/common/lib/trpc'

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, session } = Route.useRouteContext()

  const trpc = useTRPC()
  const privateData = useQuery(trpc.private.data.queryOptions())

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.name}</p>
      <p>API: {privateData.data?.message}</p>
    </div>
  )
}
