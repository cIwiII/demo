// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [vue()]
// });


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components','src/component'], 
      resolvers: [AntDesignVueResolver()],
    }),
  ]
})