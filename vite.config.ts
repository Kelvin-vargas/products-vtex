import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return{
  plugins: [react()],
  server: {
    proxy: {
      '/api/vtex': {
        target: env.VITE_VTEX_LOJA,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vtex/, ''),
      },
    },
  },
}
})