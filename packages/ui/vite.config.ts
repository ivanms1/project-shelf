import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],

  build: {
    lib: {
      fileName: (format) => `index.${format}.js`,
      entry: './index.tsx',
      formats: ['es', 'cjs'],
    },

    outDir: 'dist',
    rollupOptions: {
      external: ['react'],
    },
  },
});
