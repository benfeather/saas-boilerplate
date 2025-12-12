import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@workspace/ui/components/button'
import SignInForm from '@/components/forms/sign-in-form'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <h1 className="mb-6 text-center font-bold text-3xl">Welcome Back</h1>

      <SignInForm />

      <div className="mt-4 text-center">
        <Button
          asChild={true}
          variant="link"
          className="text-indigo-600 hover:text-indigo-800"
        >
          <Link to="/register">Need an account? Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}
