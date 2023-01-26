import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: true,
  esbuildOptions: (options) => {
    return options;
  },

  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  esbuildPlugins: [],
});
