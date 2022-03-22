import { createApp } from "vue";
import ElementPlus from "element-plus";

// 原文链接：https://blog.csdn.net/weixin_40716786/article/details/90045802
import "default-passive-events"; //Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.
import "./assets/css/global.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
const app = createApp(App);

var url = window.location.href;
url = url.split(window.location.host)[1];
console.log("url", url);

router.push(url);

app.use(router).use(store).use(ElementPlus);

router.isReady().then(() => app.mount("#app"));
