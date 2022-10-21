import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1": {
        target: "https://timezone.abstractapi.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
