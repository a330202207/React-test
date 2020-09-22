import * as types from "../action-types";
import {request}  from "../../utils/request";
import {saveUser} from "../../utils/storageUtils";

//获取用户信息
export const getUserInfo = () => (dispatch) => {
    return request("/admin/get/admin/info", {}, "GET").then(response => {
        const {data} = response;
        if (response.code === 200) {
            saveUser(data);
            dispatch(setUserInfo(data));
        } else {
            dispatch(showErrorMsg(response.message));
        }
        return response;
    });
};

//设置用户Token
export const setUserToken = (token) => {
    return {
        type: types.USER_SET_USER_TOKEN,
        token,
    };
};

//设置用户信息
export const setUserInfo = (userInfo) => {
    return {
        type: types.USER_SET_USER_INFO,
        ...userInfo,
    };
};

//重置用户
export const resetUser = () => {
    return {
        type: types.USER_RESET_USER,
    };
};

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => {
    return {
        type: types.SHOW_ERROR_MSG,
        errorMsg
    };
};
