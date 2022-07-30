import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, join, relative } from 'node:path'

const __dirname = dirname(import.meta.url)
const optionsPath = 'src/options'
const absoluteOptionsPath = join(__dirname, optionsPath)
const buildPath = relative(absoluteOptionsPath, join(__dirname, 'build'));
const publicPath = relative(absoluteOptionsPath, join(__dirname, 'static'));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return ({
    plugins: [react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    })],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    root: optionsPath,
    build: {
      rollupOptions: {
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
