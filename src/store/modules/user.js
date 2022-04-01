import { getToken, setToken } from "@/utils/auth";
import { login } from "@/api/user";

const state = {
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: [],
};

const getters = {
    getName(state) {
        return state.name;
    },
};

const mutations = {
    setName(state, name) {
        state.name = name;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
};

const actions = {
    loginByUsername({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password })
                .then((response) => {
                    const { token } = response;
                    console.log("token:", token);
                    commit("SET_TOKEN", token);
                    setToken(token);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
