import * as types          from "../action-types";
import {getToken, getUser} from "../../utils/storageUtils";

const userInfo = getUser();

const initUserInfo = {
    nickName: userInfo.user_name,
    userMenu: userInfo.menus,
    token: getToken(),
};

//用户
export default function user(state = initUserInfo, action) {
    switch (action.type) {
        case types.USER_SET_USER_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case types.USER_SET_USER_INFO:
            return {
                ...state,
                nickName: action.user_name,
                userMenu: action.menus,
            };
        case types.USER_RESET_USER:
            return {};
        case types.SHOW_ERROR_MSG:
            return {
                ...state,
                msg: action.errorMsg
            };
        default:
            return state;
    }
}
