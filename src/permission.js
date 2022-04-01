import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import { getToken } from "@/utils/auth";

NProgress.configure({ showSpinner: false });
const whiteList = ["/login", "/auth-redirect"]; // 无重定向白名单

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 添加element tabs Tab-pane数量 start
    const tabsOption = store.getters["tabModule/getTabsOption"];
    // 判断当前路由中是否已经入栈
    const flag = tabsOption.findIndex((tab) => tab.route === to.path) > -1;
    if (!flag && !to.meta.hidden) {
        store.commit("tabModule/ADD_TAB", {
            route: to.path,
            title: to.meta.title,
            name: to.name,
        });
    }
    store.commit("tabModule/SET_TAB", to.path);
    // end
    NProgress.start();
    const hasToken = getToken();
    // console.log(hasToken);
    if (hasToken) {
        if (to.path === "/login") {
            next("/");
            NProgress.done();
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            console.log("whiteList");
            // 在免费登录白名单中，直接进入
            next();
        } else {
            // 没有访问权限的其他页面将重定向到登录页面。
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
