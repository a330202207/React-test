import ajax from "./ajax";
import jsonp from "jsonp";
import {message} from "antd";

// const BASE = 'http://localhost:9003';
const BASE = '';

//登陆
export const login = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');

//添加用户
export const addUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');

//获取天气

//获取分类列表
export const getCategoryList = (parent_id) => ajax(BASE + '/admin/category/list', {parent_id});

//添加分类
export const addCategory = ({name, parent_id, order_by}) => ajax(BASE + '/admin/category/add', {
    name,
    parent_id,
    order_by,
}, 'POST');

//删除分类
export const delCategory = (id) => ajax(BASE + '/admin/category/del', {id}, 'POST');

//更新分类
export const updateCategory = ({id, name, parent_id, order_by}) => ajax(BASE + '/admin/category/save', {
    id,
    name,
    parent_id,
    order_by
}, 'POST');


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
