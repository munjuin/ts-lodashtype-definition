import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      'my-lodash': path.resolve(__dirname, './src/utils/index.ts'),
    },
  },
});