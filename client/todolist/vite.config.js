import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permite que el servidor escuche en todas las interfaces
    port: 5173,
    strictPort: true, // Esto asegura que solo use el puerto especificado
  },
});
