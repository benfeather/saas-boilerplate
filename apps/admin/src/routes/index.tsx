import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@workspace/common/components/login-form'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <LoginForm />
    </div>
  )
}
