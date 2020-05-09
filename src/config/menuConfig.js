

const menuList = [
    {
        title:'首页',
        key:'/home',
        icon:'home',
    },
    {
        title:'商品管理',
        key:'/products',
        icon:'appstore',
        children :[
            {
                title:'品类管理',
                key:'/category',
                icon:'bars',
            },
            {
                title:'商品管理',
                key:'/product',
                icon:'tool',
            },
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:'user',
    },
    {
        title:'角色管理',
        key:'/role',
        icon:'safety',
    },
    {
        title:'图表管理',
        key:'/charts',
        icon:'area-chart',
        children :[
            {
                title:'柱状图管理',
                key:'/charts/bar',
                icon:'bar-chart',
            },
            {
                title:'折线图管理',
                key:'/charts/line',
                icon:'line-chart',
            },
            {
                title:'饼状图管理',
                key:'/charts/pie',
                icon:'pie-chart',
            },
        ]
    },
];

export default menuList;