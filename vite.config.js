import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.jsx",
            ],
            refresh: false,
        }),
        react(),
        tailwindcss(),
    ],

    build: {
        outDir: "public/build", // MUST
        emptyOutDir: true,
        manifest: true,         // MUST
        minify: "esbuild",
        sourcemap: false,
    },

    base: "/build/",
});

