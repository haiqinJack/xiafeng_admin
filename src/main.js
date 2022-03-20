import { createApp } from "vue";
import ElementPlus from "element-plus";
import "./assets/css/global.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
const app = createApp(App);

app.use(router).use(store).use(ElementPlus);

router.isReady().then(() => app.mount("#app"));
