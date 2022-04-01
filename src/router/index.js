import { createRouter, createWebHistory } from "vue-router";
import routerConfig from "@/common/config/router.js";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = routerConfig;

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [];
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

export default router;
