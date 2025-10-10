import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/registro': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/tipo_envio': 'http://localhost:3000',
      '/envios': 'http://localhost:3000',
    },
  },
});
