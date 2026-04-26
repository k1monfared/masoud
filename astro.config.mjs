import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://k1monfared.github.io',
  base: '/masoud',
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
