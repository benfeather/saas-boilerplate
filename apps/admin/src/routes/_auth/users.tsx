import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@workspace/common/lib/trpc'

export const Route = createFileRoute('/_auth/users')({
  component: RouteComponent,
  loader: async () => {
    const trpc = useTRPC()
    return trpc.admin.users.getAll()
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
