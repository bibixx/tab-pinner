import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(import.meta.url)
const optionsPath = 'src/options'
const absoluteOptionsPath = join(__dirname, optionsPath)
const buildPath = relative(absoluteOptionsPath, join(__dirname, 'build'));
const publicPath = relative(absoluteOptionsPath, join(__dirname, 'static'));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return ({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/options', import.meta.url))
      }
    },
    root: optionsPath,
    build: {
      rolldownOptions: {
        input: {
          options: join(optionsPath, '/options.html'),
          background: join(optionsPath, '../background/background.ts')
        },
        output: {
          entryFileNames: ({ name }) => {
            if (name === 'background') {
              return '[name].js'
            }

            return 'assets/[name]-[hash].js'
          }
        }
      },
      outDir: buildPath,
      emptyOutDir: true,
      sourcemap: mode === 'development' ? 'inline' : undefined
    },
    publicDir: publicPath,
    server: {
      open: '/options.html'
    }
  })
})
