import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Todo_list-ReactApp',
        short_name: 'To-Do',
        description: 'My Awesome App description',
        start_url: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'es',
        background_color: '#f0f0f0',
        theme_color: '#333333',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            porpouse: 'any',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            porpouse: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
});
