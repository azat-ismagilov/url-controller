import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.PUBLIC_URL ?? "/",
    build: {
        outDir: process.env.BUILD_PATH ?? "dist",
    }
});
