import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const htmlEntries = {
    main: resolve(process.cwd(), 'index.html'),
    notFound: resolve(process.cwd(), '404.html'),
};

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: htmlEntries,
        },
    },
});
