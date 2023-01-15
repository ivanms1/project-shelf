import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: ['index.ts'],
  splitting: true,
  esbuildOptions: (options) => {
    return options;
  },

  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  esbuildPlugins: [vanillaExtractPlugin()],
});