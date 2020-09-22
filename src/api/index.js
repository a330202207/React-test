import ajax from "./ajax";
import {request} from "../utils/request";

//获取分类列表
export function getCategoryList(data) {
    console.log(data)
    return request("/admin/get/categoryList", data, "GET");
}


//获取多个分类
export function getCategories(data) {
    return request("/admin/get/categories", data, "GET");
}

//获取分类
export const getCategory = (id) => ajax('/admin/get/category', {id});

//添加分类
export function addCategory(data) {
    return request("/admin/add/category", data, "POST");
}

//删除分类
export function delCategory(data) {
    return request("/admin/del/category", data, "POST");
}

//更新分类
export function saveCategory(data) {
    return request("/admin/save/category/", data, "POST");
}

//获取商品列表
export const getProductList = (page, page_size, name, status, startTime, endTime) => ajax('/admin/get/productList', {
    page,
    page_size,
    name,
    status,
    startTime,
    endTime
});

//获取商品列表
export const getProduct = (id) => ajax('/admin/get/product', {id});

//添加商品
export const addProduct = ({name, category_id, price, order_by, details, num, imgs}) => ajax('/admin/add/product', {
    name,
    category_id,
    price,
    details,
    num,
    imgs,
    order_by
}, 'POST');

//删除商品
export const delProduct = (id) => ajax('/admin/del/product', {id}, 'POST');

//修改商品
export const saveProduct = ({id, name, category_id, price, order_by, details, num, imgs}) => ajax('/admin/save/product', {
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
export const updateProductStatus = ({id, status}) => ajax('/admin/updateStatus/product', {id, status}, 'POST');

//删除图片
export const delImg = (urls) => ajax('/admin/del/img', {urls}, 'POST');

//获取角色列表
export const getRoleList = (page, page_size) => ajax('/admin/get/roleList', {page, page_size});

//获取全部角色
export const getAllRole = () => ajax('/admin/get/all/role');

//添加角色
export const addRole = ({name, menu_ids}) => ajax('/admin/add/role', {name, menu_ids}, 'POST');

//保存角色
export const saveRole = ({id, name, menu_ids}) => ajax('/admin/save/role', {id, name, menu_ids}, 'POST');

//删除角色
export const delRole = (id) => ajax('/admin/del/role', {id}, 'POST');

//获取角色
export const getRoleMenus = (id) => ajax('/admin/get/role/menus', {id});

//获取菜单列表
export const getMenuList = (parent_id, page, page_size) => ajax('/admin/get/menuList', {
    parent_id,
    page,
    page_size
});

//获取树形菜单
export const getTreeMenu = () => ajax('admin/get/treeMenus', {});

//添加菜单
export const addMenu = ({parent_id, name, order_by, menu_router}) => ajax('/admin/add/menu', {
    parent_id,
    name,
    order_by,
    menu_router
}, 'POST');

//删除菜单
export const delMenu = (id) => ajax('/admin/del/menu', {id}, 'POST');

//保存菜单
export const saveMenu = ({id, parent_id, name, order_by, menu_router}) => ajax('/admin/save/menu', {
    id,
    parent_id,
    name,
    order_by,
    menu_router
}, 'POST');

//获取管理员列表
export const getAdminList = (page, page_size) => ajax('/admin/get/adminList', {page, page_size});

//获取管理员
export const getAdmin = (id) => ajax('/admin/get/admin', {id});

//删除用户
export const delAdmin = (id) => ajax('/admin/del/admin', {id}, 'POST');

//添加用户
export const addAdmin = ({user_name, password, phone, role_id, status}) => ajax('/admin/add/admin', {
    user_name,
    password,
    phone,
    role_id,
    status
}, 'POST');

//保存用户
export const saveAdmin = ({id, user_name, password, phone, role_id, status}) => ajax('/admin/save/admin', {
    id,
    user_name,
    password,
    phone,
    role_id,
    status
}, 'POST');
