import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useTRPC } from '@workspace/common/lib/trpc'
import { getUser } from '@/functions/get-user'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const [session] = await Promise.all([getUser()])

    if (!session) {
      throw redirect({ to: '/' })
    }

    return { session }
  },
})

function RouteComponent() {
  const { session } = Route.useLoaderData()

  const trpc = useTRPC()
  const privateData = useQuery(trpc.privateData.queryOptions())

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <p>API: {privateData.data?.message}</p>
    </div>
  )
}
