import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useTRPC } from '@workspace/ui/lib/trpc'
import { getPayment } from '@/functions/get-payment'
import { getUser } from '@/functions/get-user'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const [session, customerState] = await Promise.all([
      getUser(),
      getPayment(),
    ])

    if (!session || !customerState) {
      throw redirect({ to: '/' })
    }

    return { session, customerState }
  },
})

function RouteComponent() {
  const { session, customerState } = Route.useLoaderData()

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
