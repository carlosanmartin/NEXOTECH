import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

function frontendPage(name) {
    return fileURLToPath(
        new URL(`./frontend/${name}`, import.meta.url)
    );
}

export default defineConfig({
    root: fileURLToPath(
        new URL("./frontend/", import.meta.url)
    ),

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
                main: frontendPage("index.html"),
                productos: frontendPage("productos.html"),
                asistente: frontendPage("asistente.html")
            }
        }
    }
});
