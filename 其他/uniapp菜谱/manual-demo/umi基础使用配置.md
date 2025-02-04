### 说明

对React的二次封装，开箱即用。umi已经内置了antd、路由（fetch请求）、redux、redux-saga、less，配置使用，基于babel-plugin-import来实现antd按需加载

### 环境搭建

再本地创建一个项目目录。

```
mkdir myapp && cd myapp
```

mkdir这个命令就是我们window系统里面创建一个文件夹

创建项目结构

```
yarn create @umijs/umi-app
```

下载依赖

```
yarn  || yarn install
```

启动项目

```
yarn start
```



### 配置主题色umirc.ts文件



```
import { defineConfig } from 'umi';
export default defineConfig({
  ...
  theme:{
    "primary-color":"#ffa39e"
  },
  devServer:{
    port:8888
  }
});
```

配置了主题色后，我们加载项目按照你的配置来颜色设置

### 使用less-模块化引入

```
import Styles from "./home.less"
import "../home.less"
```

### 配置式路由-umirc.ts文件

#### 一级路由-无需渲染出口

- 说明
- 配置式，集中提到外部，编程式，路由写在对应页面。
- 复杂配置可以拆出到config/config.ts中，umirc优先级更高
- path:代表映射路径
- component：加载的组件，无需引入，提供完整路径。@src目录
- exact：地址匹配的方式，精确还是模糊

1、默认的情况，每个路由都是精确匹配

```js
routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home/Home' },
  ],
```

2、自行设置

```js
routes: [
    {exact:true, path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home/Home' },
  ],
```

3、重定向配置

```js
routes: [
    { path: '/', redirect:"/index" },
    { path: '/index', component: '@/pages/index' },
  ],
```

4、路由模式切换

```js
history:{
    type:"hash"
  }
```



#### 路由跳转-参数传递

方式一，React原生方式，组件接收props：any

```js
props.history.push('/home')
```

路由组件可通过 `props` 获取到以下属性，

- match，当前路由和 url match 后的对象，包含 `params`、`path`、`url` 和 `isExact` 属性
- location，表示应用当前处于哪个位置，包含 `pathname`、`search`、`query` 等属性
- history，同 [api#history](https://v3.umijs.org/zh-CN/api#history) 接口
- route，当前路由配置，包含 `path`、`exact`、`component`、`routes` 等
- routes，全部路由信息

方式二

另一个页面获取数据，已经解析query对象。（原生未解析）

```js
import {Link,history} from "umi"

history.push("/home")
history.push("/home?id=1&name=xiaowang")
history.push({
    pathname:"路径",
    query:{id:1}
})
<Link to="/home/product">主页</Link>
```

#### 二级路由-umirc.ts


```js
routes: [
    ...
    { path: '/home', component: '@/pages/home/Home',routes:[
      { path: '/home/', component:"@/pages/user/User" },
      { path: '/home/product', component:"@/pages/product/Product" },
    ] },
  ],
```

渲染出口，本来是插槽

```js
<div>{props.children}</div>
```

#### 404页面

```js
routes: [
   ...
    { component:"@/pages/NoFind" },
  ],
```





### 约定式路由（文件路由）

umirc中删除路由配置。自动约定式

满足以下任意规则的文件不会被注册为路由：

- 以 . 或 _ 开头的文件或目录
- 以 d.ts 结尾的类型定义文件
- 以 test.ts、spec.ts、e2e.ts 结尾的测试文件（适用于 .js、.jsx 和 .tsx 文件）
- components 和 component 目录
- utils 和 util 目录
- 不是 .js、.jsx、.ts 或 .tsx 文件
- 文件内容不包含 JSX 元素

#### 嵌套路由

对应目录下有 _layout.tsx文件，以 _layout.tsx 为该目录的 layout。layout 文件需要返回一个 React 组件，并通过 props.children 渲染子组件。

目录结构

```js
└── pages
    └── home
        ├── _layout.jsx
        ├── index.jsx
        └── product.jsx
        └── shop.jsx
```

_layout.tsx文件

```js
import React from 'react'
export default function Layout(props) {
    return (
        <div>
            {props.children}
        </div>
    )
}
```





### 配置式路由权限

1、路由添加waarper属性，值为数组存放高阶组件路径,放置多个可以分别判断是登陆、权限等。

```js
routes: [
    { path: '/user', component: 'user',
      wrappers: [
        '@/wrappers/auth',
      ],
    }
  ]
```



2、在高阶组件中（auth）useAuth为自定义

```js
import { Redirect } from 'umi'

export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
```

