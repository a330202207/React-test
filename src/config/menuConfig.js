const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home',
        isPublic: true, // 公开的
},
    {
        title: '分类管理',
        key: '/category',
        icon: 'appstore',
        children: [
            {
                title: '商品分类列表',
                key: '/category/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '商品管理',
        key: '/product',
        icon: 'appstore',
        children: [
            {
                title: '商品列表',
                key: '/product/list',
                icon: 'tool',
            },
        ]
    },
    {
        title: '菜单管理',
        key: '/menu',
        icon: 'appstore',
        children: [
            {
                title: '菜单列表',
                key: '/menu/list',
                icon: 'tool',
            },
        ]
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'user',
        children: [
            {
                title: '角色列表',
                key: '/role/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '管理员管理',
        key: '/administrator',
        icon: 'appstore',
        children: [
            {
                title: '管理员列表',
                key: '/administrator/list',
                icon: 'bars',
            }
        ]
    },
];

export default menuList;
