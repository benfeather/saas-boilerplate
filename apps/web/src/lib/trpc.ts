import { createTRPCClient, httpBatchLink } from '@trpc/client'
import {
  createTRPCContext,
  createTRPCOptionsProxy,
} from '@trpc/tanstack-react-query'
import type { AppRouter } from '@workspace/api/router/index'
import { queryClient } from './query-client'

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>()

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_SERVER_URL}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        })
      },
    }),
  ],
})

export const trpc = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient,
})
