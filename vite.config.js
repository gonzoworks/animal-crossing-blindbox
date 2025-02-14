import { defineConfig } from 'vite';

export default defineConfig({
    base: "/animal-crossing-blindbox/",  // ✅ Ensure this matches your repo name!
    root: "./",
    publicDir: "public",
    server: {
        port: 5173,
        open: true,
    }
});
