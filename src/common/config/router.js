/**
 *
 * meta.title 必填
 * mata.hidden 是否在页面显示路由
 */
let routes = [
    {
        component: "layout/index",
        redirect: { name: "dashboard" },
        meta: {
            title: "仪表盘",
            icon: "el-icon-data-analysis",
        },
        children: [
            {
                name: "dashboard",
                component: "dashboard/index",
                meta: {
                    title: "仪表盘",
                    icon: "el-icon-data-analysis",
                },
            },
        ],
    },
    {
        name: "shop",
        component: "layout/index",
        meta: {
            title: "门店管理",
            icon: "el-icon-data-analysis",
        },
        children: [
            {
                component: "shop/list",
                meta: {
                    title: "门店列表",
                },
            },
            {
                component: "shop/create",
                meta: {
                    title: "新增门店",
                },
            },
        ],
    },
	{
	    name: "category",
	    component: "layout/index",
	    meta: {
	        title: "分类管理",
	        icon: "el-icon-picture",
	    },
	    children: [
	        {
	            meta: {
	                title: "分类管理",
	                icon: "el-icon-picture",
	            },
	            component: "category/list",
	        },
	    ],
	},
    {
        name: "goods",
        component: "layout/index",
        meta: {
            title: "菜品管理",
            icon: "el-icon-data-analysis",
        },
        children: [
            {
                component: "goods/list",
                meta: {
                    title: "菜品列表",
                },
            },
            {
                component: "goods/create",
                meta: {
                    title: "新增菜品",
                },
            },
        ],
    },
    {
        name: "image",
        component: "layout/index",
        meta: {
            title: "云相册",
            icon: "el-icon-picture",
        },
        children: [
            {
                meta: {
                    title: "云相册",
                    icon: "el-icon-picture",
                },
                component: "image/index",
            },
        ],
    },
    {
        meta: {
            title: "管理员",
            icon: "el-icon-data-analysis",
        },
        component: "admin/index",
    },
    { component: "login/index", meta: { hidden: true } },
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: "dashboard" },
        meta: {
            title: "404",
            hidden: true,
        },
    },
];

function getRoutes() {
    createRoutes(routes);
    return routes;
}

const modules = import.meta.glob("/src/views/*/*.vue");

//封装 路由的 component
function createRoutes(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].component) return;
        let val = getValue(arr[i].component);
        //生成name
        arr[i].name = arr[i].name || val.replace(/\//g, "_");
        //生成path
        arr[i].path = arr[i].path || `/${val}`;

        //生成component
        // let componentFun = import(`../../views/${arr[i].component}.vue`);
        // arr[i].component = () => componentFun;
        arr[i].component = modules[`/src/views/${arr[i].component}.vue`];
        if (arr[i].children && arr[i].children.length > 0) {
            createRoutes(arr[i].children);
        }
    }
}

//去除index
function getValue(str) {
    let index = str.lastIndexOf("/");
    let val = str.substring(index + 1, str.length);
    return val === "index" ? str.substring(index, -1) : str;
}
export default getRoutes();
