import ajax from "./ajax";
import jsonp from "jsonp";
import {message} from "antd";

const BASE = '';

//登陆
export const login = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');

//添加用户
export const addUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');

//获取天气

//获取分类列表
export const getCategoryList = (parentId) => ajax(BASE + 'https://www.studyinghome.com/mock/5e4f59f3ca6994415ce34139/example/admin/category/list', {parentId});

//添加分类
export const addCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {
    categoryName,
    parentId
}, 'POST');

//更新分类
export const updateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {
    categoryId,
    categoryName
}, 'POST');

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId});

/*
json 请求函数
 */
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        // const url = `https://api.seniverse.com/v3/weather/now.json?key=SxjZBKEAoibnCPLPD&location=${city}`;
        const url = `https://api.seniverse.com/v3/weather/now.json?key=SxjZBKEAoibnCPLPD&location=${city}`;

        jsonp(url, {}, (err, data) => {
            if (!err) {
                const {weather} = '';
                resolve({weather})
            } else {
                message.error("获取天气信息失败!");
            }
        });
    });
};
