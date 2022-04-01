import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import store from "@/store";
import { getToken } from "@/utils/auth";

let BASE_URL;
if (import.meta.env.PROD) {
    BASE_URL =
        "https://xiafeng-1731703-1301297803.ap-shanghai.run.tcloudbase.com";
} else {
    BASE_URL = "http://localhost:80";
}
console.log(BASE_URL, "BASE_RUL");
// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    baseURL: BASE_URL,
    timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers["X-Token"] = getToken();
        }
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data;
        console.log("axios-response", res);
        // if the custom code is not 0, it is judged as an error.
        if (res.code !== 0) {
            ElMessage({
                message: res.message || "Error",
                type: "error",
                duration: 5 * 1000,
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (
                res.code === 50008 ||
                res.code === 50012 ||
                res.code === 50014
            ) {
                // to re-login
                ElMessageBox.confirm(
                    "You have been logged out, you can cancel to stay on this page, or log in again",
                    "Confirm logout",
                    {
                        confirmButtonText: "Re-Login",
                        cancelButtonText: "Cancel",
                        type: "warning",
                    }
                ).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res;
        }
    },
    (error) => {
        console.error(error);
        ElMessage({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;
