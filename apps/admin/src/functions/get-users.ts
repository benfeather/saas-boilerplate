import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { authClient } from '@workspace/common/lib/auth-client'
import { authMiddleware } from '@/middleware/auth'

export const getUsers = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async () => {
    const { data, error } = await authClient.admin.listUsers({
      query: {},
      fetchOptions: {
        headers: getRequestHeaders(),
      },
    })

    if (error) {
      throw error
    }

    return data
  })
