import { createFileRoute } from '@tanstack/react-router'
import SignInForm from '@/components/forms/sign-in-form'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <h1 className="mb-6 text-center font-bold text-3xl">Welcome Back</h1>

      <SignInForm />
    </div>
  )
}
