import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: process.env.PUBLIC_URL ?? "/",
    build: {
        outDir: process.env.BUILD_PATH ?? "dist",
    }
});
