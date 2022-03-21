import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const common = {
        plugins: [vue()],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
                /**
                 * 解决浏览器报错：
                 * Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
                 */
                vue: "vue/dist/vue.esm-bundler.js",
            },
        },
        css: {
            postcss: {
                plugins: [require("postcss-nested"), require("autoprefixer")],
            },
        },
    };
    if (mode === "development") {
        return Object.assign(common, {
            server: {
                cors: true,
                proxy: {
                    "/signin": {
                        target: "http://localhost:80",
                        changeOrigin: true,
                    },
                },
            },
        });
    } else {
        return Object.assign(common, {
            server: {
                cors: true,
                proxy: {
                    "/signin": {
                        target: "https://xiafeng-1731703-1301297803.ap-shanghai.run.tcloudbase.com",
                        changeOrigin: true,
                    },
                },
            },
        });
    }
});
