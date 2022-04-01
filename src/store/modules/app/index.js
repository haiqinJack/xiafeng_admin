import Cookies from "js-cookie";
// create a new Store Modules.
const appModule = {
    namespaced: true,
    state: {
        sidebar: {
            opened: Cookies.get("sidebarStatus")
                ? !!Cookies.get("sidebarStatus")
                : true,
            withoutAnimation: false,
        },
        device: "desktop",
    },
    mutations: {
        toggle_sidebar: (state) => {
            state.sidebar.opened = !state.sidebar.opened;

            state.sidebar.withoutAnimation = false;
            if (state.sidebar.opened) {
                Cookies.set("sidebarStatus", 1);
            } else {
                Cookies.set("sidebarStatus", 0);
            }
        },
        close_sidebar: (state, withoutAnimation) => {
            Cookies.set("sidebarStatus", 0);
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = withoutAnimation;
        },
        toggle_device: (state, device) => {
            state.device = device;
        },
    },
    actions: {
        toggleSideBar({ commit }) {
            commit("toggle_sidebar");
        },
        closeSideBar({ commit }, { widthoutAnimation }) {
            commit("close_sidebar", widthoutAnimation);
        },
        toggleDevice({ commit }, device) {
            commit("toggle_device", device);
        },
    },
    getters: {
        getSidebarState(state) {
            return state.sidebar.opened;
        },
        getSidebarAnimation(state) {
            return state.sidebar.withoutAnimation;
        },
        getDeviceState(state) {
            return state.device;
        },
    },
};
export default appModule;
