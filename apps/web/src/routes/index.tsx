import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@workspace/common/lib/trpc'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const healthCheck = useQuery(trpc.public.healthCheck.queryOptions())

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-bold text-3xl">Hello World</h1>

      <p>This is the home page!</p>

      <div className="mt-6 grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>

          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`}
            />

            <span className="text-muted-foreground text-sm">
              {healthCheck.isLoading
                ? 'Checking...'
                : healthCheck.data
                  ? 'Connected'
                  : 'Disconnected'}
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
