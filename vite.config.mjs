import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const frontend = fileURLToPath(
    new URL("./frontend/", import.meta.url)
);

export default defineConfig({
    root: frontend,

    server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true
    },

    build: {
        outDir: "../dist",
        emptyOutDir: true,

        rollupOptions: {
            input: {
                main: fileURLToPath(
                    new URL("./frontend/index.html", import.meta.url)
                ),
                productos: fileURLToPath(
                    new URL("./frontend/productos.html", import.meta.url)
                )
            }
        }
    }
});
