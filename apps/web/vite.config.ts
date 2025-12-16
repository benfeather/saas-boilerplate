import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { env } from '@workspace/env/server'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    devtools({
      eventBusConfig: {
        port: env.WEB_DEVTOOLS_PORT,
      },
    }),
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  server: {
    port: env.WEB_PORT,
  },
})
