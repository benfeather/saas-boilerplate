import { createFileRoute } from '@tanstack/react-router'
import { getUsers } from '@/functions/get-users'

export const Route = createFileRoute('/_auth/users')({
  component: RouteComponent,
  loader: async () => {
    const data = await getUsers()

    return {
      data,
    }
  },
})

function RouteComponent() {
  const { data } = Route.useLoaderData()
  const { user } = Route.useRouteContext()

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
