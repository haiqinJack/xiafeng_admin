import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
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
});
