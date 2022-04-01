import { createStore } from "vuex";
import user from "./modules/user.js";
import appModule from "./modules/app";
import permissionModule from "./modules/permission";
import tabModule from "./modules/tabs";
import goods_create from "./modules/goods_create.js";
// const modulesFiles = import.meta.globEager('./modules/*.js')

const store = createStore({
    modules: {
        user,
        appModule,
        permissionModule,
        tabModule,
        goods_create,
    },
});

export default store;
