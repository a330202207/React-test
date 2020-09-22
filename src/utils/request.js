import {Modal} from "antd";
import axios   from "axios";
import store   from "../redux/store";

import {getToken} from "./storageUtils";
import {logout}   from "../redux/actions";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,        //api的base_url
    timeout: 10000,                                  //request timeout
});

instance.defaults.headers.post["Content-Type"] = "application/json";

// let httpCode = {
//     400: "请求参数错误",
//     401: "权限不足, 请重新登录",
//     403: "服务器拒绝本次访问",
//     404: "请求资源未找到",
//     500: "内部服务器错误",
//     501: "服务器不支持该请求中使用的方法",
//     502: "网关错误",
//     504: "网关超时"
// };

//请求拦截器
instance.interceptors.request.use((config) => {
        if (store.getState().user.token) {
            // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
            config.headers.token = getToken();
        }
        return config;
    }, (error) => {
        console.log(error); // for debug
        Promise.reject(error);
    }
);

//响应拦截器
instance.interceptors.response.use((response) => {
        const res = response.data;
        if (res.code === 12003 || res.code === 301) {
            let secondsToGo = 3;
            let token = store.getState().user.token;
            const modal = Modal.warning({
                title: "账户异常",
                content: "您的账号已被封禁，请联系管理",
                onOk() {
                    store.dispatch(logout(token));
                },
                okText: `确定(${secondsToGo})`
            });

            const timer = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                    okText: `确定(${secondsToGo})`,
                });
            }, 1000);

            setTimeout(() => {
                clearInterval(timer);
                store.dispatch(logout(token));
            }, secondsToGo * 1000);

        }
        return Promise.resolve(res);
    }, (error) => {
        console.log("err" + error); // for debug
        return Promise.reject(error);
    }
);

//发送请求
export const request = (url, params = {}, method = "POST", config = {}) => {
    return new Promise((resolve, reject) => {
        let headers = headerCom();
        const data = (method === "GET") ? "params" : "data";
        if (config.headers) {
            headers = {
                ...headers,
                ...config.headers
            };
        }
        if (method === "POST") {
            let initParams = {
                timeStamp: new Date().getTime(),
                appSign: 12
            };
            if (params) {
                params = {
                    ...params,
                    ...initParams
                };
            } else {
                params = initParams;
            }
        }
        instance({
            url: url,
            method,
            [data]: params,
            headers,
        }).then(response => {
            resolve(response);
        }).catch(error => {
            console.dir(error);
            reject(error);
        });
    });
};

//上传图片
export const upload = (url, data) => {
    return new Promise((resolve, reject) => {
        instance({
            url: url,
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            data,
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

//默认header参数
export const headerCom = () => {
    return {
        "osVer": "1",
        "channel": "h5",
        "appVersion": 1,
        "deviceId": "1"
    };
};


export default instance;
