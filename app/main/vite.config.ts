import { builtinModules } from 'module';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const isDevelopment = process.env.MODE === 'development';
// https://vitejs.dev/config/
export default defineConfig({
    mode: process.env.MODE,
    root: __dirname,
    envDir: process.cwd(),
    build: {
        sourcemap: isDevelopment ? 'inline' : 'hidden',
        target: 'node16',
        outDir: 'dist',
        assetsDir: '.',
        minify: !isDevelopment,
        lib: {
            entry: 'src/main.ts',
            formats: ['cjs'],
        },
        rollupOptions: {
            external: [
                'electron',
                'electron-devtools-installer',
                ...builtinModules,
            ],
            input: {
                main: resolve(__dirname, 'src/main.ts'),
                preload: resolve(__dirname, 'src/preload.ts'),
            },
            output: {
                entryFileNames: '[name].cjs',
            },
        },
        emptyOutDir: true,
        brotliSize: false,
    },
});
