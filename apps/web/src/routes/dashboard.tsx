import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@workspace/common/lib/auth-client'
import { useTRPC } from '@workspace/common/lib/trpc'
import { Button } from '@workspace/common/ui/button'
import { getPayment } from '@/functions/get-payment'
import { getUser } from '@/functions/get-user'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => {
    const [session, customerState] = await Promise.all([
      getUser(),
      getPayment(),
    ])

    if (!session) {
      throw redirect({ to: '/login' })
    }

    return { session, customerState }
  },
})

function RouteComponent() {
  const { session, customerState } = Route.useLoaderData()

  const trpc = useTRPC()
  const privateData = useQuery(trpc.privateData.queryOptions())

  const hasProSubscription =
    (customerState?.activeSubscriptions?.length ?? 0) > 0

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <p>API: {privateData.data?.message}</p>
      <p>Plan: {hasProSubscription ? 'Pro' : 'Free'}</p>
      <Button
        variant="outline"
        onClick={async function handlePortal() {
          await authClient.customer.portal()
        }}
      >
        Manage Subscription
      </Button>
      <Button
        variant="outline"
        onClick={async function handleUpgrade() {
          await authClient.checkout({ slug: 'pro' })
        }}
      >
        Upgrade to Pro
      </Button>
    </div>
  )
}
