import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./redux/store"
import {Provider} from "react-redux"//容器组件，包裹app后，页面任何地方（子组件）可以使用redux仓库。
// 配置config后不需要引入所有样式
// import 'antd/dist/antd.min.css';
// import 'antd/dist/antd.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
  </Provider>
);

/* 
connect组件使用reducer案例：component/calss
withRouter：组件props绑定history、location对象，component/WithRouter
echarts-for-react:使用：Salary页面
reducer使用：Main
Login：样式模块化演示
路由在对应的页面下写
*/
/* 138121201806020493
宏动力：axios封装，redux拆分合并，antd组件封装，系统挂炉模块（角色），部分不一致封装，echarts封装

*/