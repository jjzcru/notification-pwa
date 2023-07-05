import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    injectRegister: 'script',
    strategies: 'injectManifest',
    registerType: 'autoUpdate',
    manifest: {
      name: 'My Awesome App',
      short_name: 'MyApp',
      description: 'My Awesome App description',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'vite.png',
          sizes: '16x16',
          type: 'image/png'
        }
      ]
    },
    devOptions: {
      enabled: true
    }
  })],
})
