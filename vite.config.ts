import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";


export default defineConfig({
  plugins: [vue(), ImportMetaEnvPlugin.vite({
    example: ".env.example.public",
  }),],
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  build: {
    outDir: './docs'
  }
})
