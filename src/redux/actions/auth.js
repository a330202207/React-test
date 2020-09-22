import {setUserToken, resetUser, showErrorMsg} from "./user";
import {setToken, removeToken, removeUser}     from "../../utils/storageUtils";
import {request}                               from "../../utils/request";

//登陆
export const login = (username, password) => (dispatch) => {
    return request("/admin/login", {
        user_name: username.trim(),
        password: password,
    }, "POST").then(response => {
        if (response.code === 200) {
            const {token} = response.data;
            dispatch(setUserToken(token));
            setToken(token);
        } else {
            dispatch(showErrorMsg(response.message));
        }
        return response;
    });
};


//登出
export const logout = () => (dispatch) => {
    dispatch(resetUser());
    removeToken();
    removeUser();
    window.location.reload();
};
