import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const { PORT } = process.env

export default defineConfig({
  plugins: [
    devtools(),
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  server: {
    port: PORT ? Number(PORT) : undefined,
  },
})
