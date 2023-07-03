import {
  MailOutlined, AppstoreOutlined,
  SettingOutlined, DeleteOutlined
} from '@ant-design/icons';

/** home页显示菜单 */
export const menuList = [
  { id: '0', name: '首页', path: '/home/index', icon: <MailOutlined /> },
  { id: '1', name: '用户管理', path: '/home/user', icon: <AppstoreOutlined /> },
  { id: '2', name: '角色管理', path: '/home/role', icon: <SettingOutlined /> },
  { id: '3', name: '店铺管理', path: '/home/shop', icon: <DeleteOutlined /> },
  {
    id: '4', name: '商品管理', path: '/home/product', icon: <MailOutlined />, children: [
      { id: '6', name: '商品列表', path: '/home/product/list', icon: <MailOutlined /> },
      { id: '7', name: '商品分类', path: '/home/product/category', icon: <MailOutlined /> }

    ]
  },
  {
    id: '5', name: '信息统计', path: '/home/charts', icon: <MailOutlined />, children: [
      { id: 41, name: '工资流水', path: '/home/charts/salary', icon: <MailOutlined /> },
      { id: 42, name: '销售管理', path: '/home/charts/sale', icon: <MailOutlined /> }
    ]
  },
]

/** 默认顶部已经打开的菜单 */
export const defalutOpenTopMunes =[
  { id: '0', name: '首页', path: '/home/index', status: 0 }
]

/** 所有需要生成路由的页面 path */
export const allPage = ['home',
'/home/index','/home/role','/home/product/list','/home/product/add',
'/home/shop', '/home/user','/home/adduser','/home/product/category',
'/home/charts/salary','/home/charts/sale',
]
/** 非菜单路由，白名单，登陆可访问 */
export const includes = ['home','/home/product/add','/home/adduser']


/** 要渲染的 tree组件 授权管理 */
export const treeData = [
  {
    title: "首页",
    key: "/home/index"
  },
  {
    title: "用户",
    key: "/home/user"
  },
  {
    title: "角色",
    key: "/home/role"
  },
  {
    title: "店铺",
    key: "/home/shop"
  },
  {
    title: "商品",
    key: "/home/product",
    children: [
      {
        title: "商品分类",
        key: "/home/product/list"
      },
      {
        title: "商品列表",
        key: "/home/product/category"
      }
    ]
  },
  {
    title: "信息统计",
    key: "/home/charts",
    children: [
      {
        title: "工资流水",
        key: "/home/charts/salary"
      },
      {
        title: "销售管理",
        key: "/home/charts/sale"
      }
    ]
  }
];
