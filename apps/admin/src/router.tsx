import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { queryClient } from '@workspace/ui/lib/query-client'
import { TRPCProvider, trpc, trpcClient } from '@workspace/ui/lib/trpc'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const router = createRouter({
    context: {
      trpc,
      queryClient,
    },
    defaultNotFoundComponent: () => <div>Not Found</div>,
    defaultPendingComponent: () => <div>Loading...</div>,
    routeTree,
    scrollRestoration: true,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {children}
        </TRPCProvider>
      </QueryClientProvider>
    ),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
