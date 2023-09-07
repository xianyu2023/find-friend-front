import * as path from "path";
import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import {VantResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";



export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    base: "./", //等同于  assetsPublicPath :'./'
    // 【坑。vue3+vite4构建，如果路由用history，这里要设置base，仅限微信开放平台有效，因为它按照我们的docker配置了nginx】
    //【坑。本地server模拟的线上环境没有设置nginx，虽然这里设置了base】
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "view": path.resolve(__dirname, "src/view"),
            "components": path.resolve(__dirname, "src/components"),
            "assets": path.resolve(__dirname, "src/assets"),
            "store": path.resolve(__dirname, "src/store"),
            "mixins": path.resolve(__dirname, "src/mixins"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/styles/common.scss";'
            }
        }
    },
    server: {
        host: "0.0.0.0",
    },

});
