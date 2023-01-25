import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        host: true,
        proxy: {
            '^/.*/src': {
                target: 'http://localhost:3000',
                rewrite: (path) => path.replace(/^\/.*\/src/, '/src'),
            },
        },
    },
    resolve: { alias: { '@': '/src' } },
    plugins: [vue()]
});
