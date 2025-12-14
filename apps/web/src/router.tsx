import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import { queryClient } from '@/lib/query-client'
import { TRPCProvider, trpc, trpcClient } from '@/lib/trpc'
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
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
