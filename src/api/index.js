import ajax from "./ajax";
import jsonp from "jsonp";
import {message} from "antd";

// const BASE = 'http://localhost:9003';
const BASE = '';

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

//登陆
export const login = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');

//添加用户
export const addUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');

//获取天气

//获取分类列表
export const getCategoryList = (parent_id, page, page_size) => ajax(BASE + '/admin/get/categoryList', {
    parent_id,
    page,
    page_size
});

//获取多个分类
export const getCategories = (parent_id) => ajax(BASE + '/admin/get/categories', {parent_id});

//获取分类
export const getCategory = (id) => ajax(BASE + '/admin/get/category', {id});

//添加分类
export const addCategory = ({name, parent_id, order_by}) => ajax(BASE + '/admin/add/category', {
    name,
    parent_id,
    order_by,
}, 'POST');

//删除分类
export const delCategory = (id) => ajax(BASE + '/admin/del/category', {id}, 'POST');

//更新分类
export const saveCategory = ({id, name, parent_id, order_by}) => ajax(BASE + '/admin/save/category/', {
    id,
    name,
    parent_id,
    order_by
}, 'POST');

//获取商品列表
export const getProductList = (page, page_size, name, status, startTime, endTime) => ajax(BASE + '/admin/get/productList', {
    page,
    page_size,
    name,
    status,
    startTime,
    endTime
});

//获取商品列表
export const getProduct = (id) => ajax(BASE + '/admin/get/product', {id});

//添加商品
export const addProduct = ({name, category_id, price, order_by, details, num, imgs}) => ajax(BASE + '/admin/add/product', {
    name,
    category_id,
    price,
    details,
    num,
    imgs,
    order_by
}, 'POST');

//删除商品
export const delProduct = (id) => ajax(BASE + '/admin/del/product', {id}, 'POST');

//修改商品
export const saveProduct = ({id, name, category_id, price, order_by, details, num, imgs}) => ajax(BASE + '/admin/save/product', {
    id,
    name,
    category_id,
    price,
    details,
    num,
    imgs,
    order_by
}, 'POST');

//商品上下架
export const updateProductStatus = ({id, status}) => ajax(BASE + '/admin/updateStatus/product', {id, status}, 'POST');

//删除图片
export const delImg = (urls) => ajax(BASE + '/admin/del/img', {urls}, 'POST');

//获取角色列表
export const getRoleList = (page, page_size) => ajax(BASE + '/admin/get/roleList', {page, page_size});

//获取全部角色
export const getAllRole = () => ajax(BASE + '/admin/get/all/role');

//添加角色
export const addRole = ({name, menu_ids}) => ajax(BASE + '/admin/add/role', {name, menu_ids}, 'POST');

//保存角色
export const saveRole = ({id, name, menu_ids}) => ajax(BASE + '/admin/save/role', {id, name, menu_ids}, 'POST');

//删除角色
export const delRole = (id) => ajax(BASE + '/admin/del/role', {id}, 'POST');

//获取角色
export const getRoleMenus = (id) => ajax(BASE + '/admin/get/role/menus', {id});

//获取菜单列表
export const getMenuList = (parent_id, page, page_size) => ajax(BASE + '/admin/get/menuList', {
    parent_id,
    page,
    page_size
});

//获取树形菜单
export const getTreeMenu = () => ajax(BASE + 'admin/get/treeMenus', {});

//添加菜单
export const addMenu = ({parent_id, name, order_by, menu_router}) => ajax(BASE + '/admin/add/menu', {
    parent_id,
    name,
    order_by,
    menu_router
}, 'POST');

//删除菜单
export const delMenu = (id) => ajax(BASE + '/admin/del/menu', {id}, 'POST');

//保存菜单
export const saveMenu = ({id, parent_id, name, order_by, menu_router}) => ajax(BASE + '/admin/save/menu', {
    id,
    parent_id,
    name,
    order_by,
    menu_router
}, 'POST');

//获取管理员列表
export const getAdminList = (page, page_size) => ajax(BASE + '/admin/get/adminList', {page, page_size});

//获取管理员
export const getAdmin = (id) => ajax(BASE + '/admin/get/admin', {id});

//删除用户
export const delAdmin = (id) => ajax(BASE + '/admin/del/admin', {id}, 'POST');

//添加用户
export const addAdmin = ({user_name, password, phone, role_id, status}) => ajax(BASE + '/admin/add/admin', {
    user_name,
    password,
    phone,
    role_id,
    status
}, 'POST');

//保存用户
export const saveAdmin = ({id, user_name, password, phone, role_id, status}) => ajax(BASE + '/admin/save/admin', {
    id,
    user_name,
    password,
    phone,
    role_id,
    status
}, 'POST');