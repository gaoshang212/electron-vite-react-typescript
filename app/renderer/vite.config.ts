import { builtinModules } from 'module';
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    mode: process.env.MODE,
    root: __dirname,
    plugins: [react()],
    base: '',
    server: {
        fs: {
            strict: true,
        },
    },
    build: {
        sourcemap: true,
        target: `chrome94`,
        outDir: 'dist',
        assetsDir: '.',
        rollupOptions: {
            external: [
                ...builtinModules,
            ],
        },
        emptyOutDir: true,
        brotliSize: false,
    },
});
