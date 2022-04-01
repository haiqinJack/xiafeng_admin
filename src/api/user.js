import request from "@/utils/request";

export function login(data) {
    return request({
        url: "/signin",
        method: "post",
        data,
    });
}

export function getInfo(token) {
    return request({
        url: "/sign",
        method: "get",
        params: { token },
    });
}

export function logout() {
    return request({
        url: "/sign",
        method: "post",
    });
}
