import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import {resolve} from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],//
    resolve: {
        alias: {"@": resolve(__dirname, "./src"),}//
    },//
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return "vendor"
                    }
                },//
                entryFileNames: "js/[name]-[hash].js",//
                chunkFileNames: "js/[name]-[hash].js",//
                assetFileNames({names}) {
                    const name = names[0]
                    if (name.endsWith(".css")) {
                        return "css/[name]-[hash].[ext]"
                    }
                    const img = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"]
                    if (img.some(i => name.endsWith(i))) {
                        return "img/[name]-[hash].[ext]"
                    }
                    return "assets/[name]-[hash].[ext]"
                }
            }
        }
    },//
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:9091",//
                changeOrigin: true,//
                ws: true,//
                rewrite: path => path.replace(/^\/api/, ""),//
            }
        }
    }
})
