/* eslint-disable no-restricted-syntax */
import router, { constantRoutes, asyncRoutes } from "@/router";
import Service from "./api";

const roles = localStorage.getItem("role") || "";
// create a new Store Modules.
const permissionModule = {
    namespaced: true,
    state: {
        roles, // 用户包含的角色,
        permissions: [], // 用户指定局部操作权限
        accessRoutes: constantRoutes, // 可访问路由集合
        routes: constantRoutes, // 所有路由集合
        authedRoutes: [],
    },
    mutations: {
        setRoles: (state, { roleName }) => {
            state.roles = roleName;
            console.log(state.roles);
        },
        setAccessRoutes: (state, routes) => {
            state.accessRoutes = constantRoutes.concat(routes);
        },
        setRoutes: (state, routes) => {
            state.routes = constantRoutes.concat(routes);
        },
        setAuthedRoutes: (state, authedRoutes = []) => {
            state.authedRoutes = authedRoutes;
            localStorage.setItem("authedRoutes", JSON.stringify(authedRoutes));
        },
        setPermissions: (state, permissions = []) => {
            state.permissions = permissions;
        },
    },
    actions: {
        // 异步接口请求，动态添加路由
        getPermissonRoutes({ commit }, payload) {
            // api request
            const data = {
                roleName: payload.roleName,
            };
            // 后端根据角色名称，查询授权菜单
            Service.postAuthPermission(data).then((res) => {
                const { authedRoutes } = res.data;
                commit("setAuthedRoutes", authedRoutes);
                // 过滤只显示授权菜单
                const accessedRoutes = [];

                for (const path of authedRoutes) {
                    for (const item of asyncRoutes) {
                        if (item.path === path) {
                            accessedRoutes.push(item);
                        }
                    }
                }
                // 动态添加路由  vue-router4.x 暂时没有addRoutes
                router.isReady().then(() => {
                    accessedRoutes.forEach((route) => {
                        const routeName = route.name;
                        if (!router.hasRoute(routeName)) {
                            router.addRoute(route);
                        }
                    });
                    router.options.routes = constantRoutes.concat(asyncRoutes);
                    console.log(router);
                    commit("setAccessRoutes", accessedRoutes);
                });
            });
        },
        getPermissions({ commit }) {
            // 后端根据角色名称，查询授权菜单
            Service.postPermissions({}).then((res) => {
                const { permissions } = res.data;
                commit("setPermissions", permissions);
            });
        },

        getRoutes({ commit }) {
            // api request
            // 动态添加路由  vue-router4.x 暂时没有addRoutes
            if (localStorage.getItem("authedRoutes")) {
                const authedRoutes = JSON.parse(
                    localStorage.getItem("authedRoutes")
                );
                const accessedRoutes = [];
                for (const path of authedRoutes) {
                    for (const item of asyncRoutes) {
                        if (item.path === path) {
                            accessedRoutes.push(item);
                        }
                    }
                }
                accessedRoutes.forEach((route) => {
                    const routeName = route.name;
                    if (!router.hasRoute(routeName)) {
                        router.addRoute(route);
                    }
                });
            }

            commit("setRoutes", asyncRoutes);
        },
        // 授权角色
        getPermissonRoles({ commit }, payload) {
            // api request
            localStorage.setItem("role", payload.roleName);
            commit("setRoles", payload);
        },
    },
    getters: {
        getAccessRoutes(state) {
            return state.routes;
        },
        authedRoutes(state) {
            return state.authedRoutes;
        },
        getRoles(state) {
            return state.roles;
        },
        getPermission(state) {
            return state.permissions;
        },
    },
};
export default permissionModule;
