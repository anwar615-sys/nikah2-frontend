import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev proxy: set VITE_API_URL=/api in .env to route API + socket traffic through
// the Vite server (avoids CORS when the backend only allows its own domain).
const BACKEND = process.env.BACKEND_ORIGIN || 'https://nikah2-backend.onrender.com';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: BACKEND, changeOrigin: true, secure: true },
      '/socket.io': { target: BACKEND, changeOrigin: true, ws: true, secure: true },
    },
  },
});
