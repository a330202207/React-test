/*
进行local数据存储管理的工具模块
 */
const USER_INFO = "userInfo";
const TOKEN_KEY = "token";

//获取Token
export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || "";
}

//设置Token
export function setToken(token) {
    return sessionStorage.setItem(TOKEN_KEY, token);
}

//删除Token
export function removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}

//保存user
export function saveUser(user) {
    return sessionStorage.setItem(USER_INFO, JSON.stringify(user));
}

//获取user
export function getUser() {
    return JSON.parse(sessionStorage.getItem(USER_INFO) || "{}");
}

//删除user
export function removeUser() {
    return sessionStorage.removeItem(USER_INFO);
}
