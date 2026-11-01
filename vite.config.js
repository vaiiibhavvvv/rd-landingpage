import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});
