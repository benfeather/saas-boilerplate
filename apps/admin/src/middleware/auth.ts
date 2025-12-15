import { createMiddleware } from '@tanstack/react-start'
import { authClient } from '@workspace/common/lib/auth-client'

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: request.headers,
        throw: true,
      },
    })

    if (!session?.user) {
      throw new Response('Unauthorized', { status: 401 })
    }

    if (session.user.role !== 'admin') {
      throw new Response('Forbidden', { status: 403 })
    }

    return next({
      context: { session },
    })
  },
)
