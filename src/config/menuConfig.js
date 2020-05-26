const menuList = [
    {
        title: '首页',
        key: "1",
        order_by: 1,
        menu_router: '/home',
        icon: 'home',
    },
    {
        title: '分类管理',
        key: "2",
        order_by: 1,
        menu_router: '/category',
        icon: 'appstore',
        children: [
            {
                title: '商品分类列表',
                key: "3",
                order_by: 1,
                menu_router: '/category/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '商品管理',
        key: "4",
        order_by: 2,
        menu_router: '/product',
        icon: 'appstore',
        children: [
            {
                title: '商品列表',
                key: "5",
                order_by: 1,
                menu_router: '/product/list',
                icon: 'tool',
            },
        ]
    },
    {
        title: '菜单管理',
        key: "6",
        order_by: 4,
        menu_router: '/menu',
        icon: 'appstore',
        children: [
            {
                title: '菜单列表',
                key: "7",
                order_by: 5,
                menu_router: '/menu/list',
                icon: 'tool',
            },
        ]
    },
    {
        title: '角色管理',
        key: "8",
        order_by: 5,
        menu_router: '/role',
        icon: 'user',
        children: [
            {
                title: '角色列表',
                key: "9",
                order_by: 1,
                menu_router: '/role/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '管理员管理',
        key: "10",
        order_by: 7,
        menu_router: '/admin',
        icon: 'appstore',
        children: [
            {
                title: '管理员列表',
                key: "11",
                order_by: 1,
                menu_router: '/admin/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '用户管理',
        key: "12",
        order_by: 7,
        menu_router: '/user',
        icon: 'appstore',
        children: [
            {
                title: '管理员列表',
                key: "13",
                order_by: 5,
                menu_router: '/user/list',
                icon: 'bars',
            }
        ]
    },
    {
        title: '图表管理',
        key: "14",
        order_by: 7,
        menu_router: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱状图管理',
                key: "15",
                order_by: 7,
                menu_router: '/charts/bar',
                icon: 'bar-chart',
            },
            {
                title: '折线图管理',
                key: "16",
                order_by: 7,
                menu_router: '/charts/line',
                icon: 'line-chart',
            },
            {
                title: '饼状图管理',
                key: "17",
                order_by: 7,
                menu_router: '/charts/pie',
                icon: 'pie-chart',
            },
        ]
    },
];

export default menuList;