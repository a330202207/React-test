const menuList = [
    {
        title: '首页',
        order_by: 1,
        key: '/home',
        icon: 'home',
        isPublic: true, // 公开的
},
    {
        title: '分类管理',
        order_by: 1,
        key: '/category',
        icon: 'appstore',
        children: [
            {
                title: '商品分类列表',
                order_by: 1,
                key: '/category/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '商品管理',
        order_by: 2,
        key: '/product',
        icon: 'appstore',
        children: [
            {
                title: '商品列表',
                order_by: 1,
                key: '/product/list',
                icon: 'tool',
            },
        ]
    },
    {
        title: '菜单管理',
        order_by: 4,
        key: '/menu',
        icon: 'appstore',
        children: [
            {
                title: '菜单列表',
                order_by: 5,
                key: '/menu/list',
                icon: 'tool',
            },
        ]
    },
    {
        title: '角色管理',
        order_by: 5,
        key: '/role',
        icon: 'user',
        children: [
            {
                title: '角色列表',
                order_by: 1,
                key: '/role/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '管理员管理',
        order_by: 7,
        key: '/admin',
        icon: 'appstore',
        children: [
            {
                title: '管理员列表',
                order_by: 1,
                key: '/admin/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '用户管理',
        order_by: 7,
        key: '/user',
        icon: 'appstore',
        children: [
            {
                title: '管理员列表',
                order_by: 5,
                key: '/user/list',
                icon: 'bars',
            }
        ]
    },
];

export default menuList;
