// create a new Store Modules.
//会在router.beforeEach里重新初始化
const tabModule = {
    namespaced: true,
    state: {
        tabsOption: [
            {
                route: "/dashboard",
                title: "仪表盘",
                name: "dashboard",
            },
        ],
        currentIndex: "dashboard",
        breadcrumbList: [],
    },
    mutations: {
        ADD_TAB: (state, data) => {
            state.tabsOption.push(data);
        },
        DELETE_TAB: (state, route) => {
            const index = state.tabsOption.findIndex(
                (tab) => tab.route === route
            );
            state.tabsOption.splice(index, 1);
        },
        SET_TAB: (state, index) => {
            state.currentIndex = index;
        },
    },
    actions: {},
    getters: {
        getCurrentIndex(state) {
            return state.currentIndex;
        },
        getTabsOption(state) {
            return state.tabsOption;
        },
    },
};
export default tabModule;
