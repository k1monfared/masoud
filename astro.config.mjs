import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  build: { format: 'directory' },
  trailingSlash: 'never',
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
});
