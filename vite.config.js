const path = require('path')
import { defineConfig } from 'vite'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

export default defineConfig ({
  resolve: {
    alias: {
      'base': path.resolve(__dirname, 'src/base')
    },
  },
  test: {
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
