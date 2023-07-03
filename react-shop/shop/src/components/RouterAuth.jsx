/**
 * 进行路由的权限匹配，所有路由都通过此页面
 */
import React, { Component } from "react";

import { Redirect, Route } from "react-router-dom";

import router from "../config/router";

export default class RouterAuth extends Component {
  render() {
    //(1)默认当前获取到访问路由地址
    const { pathname } = this.props.location;

    //(2)判断token是否存在，更近一步需要验证token有效性
    const token = localStorage.getItem("token");



    // (3)你访问路由地址是否在我们映射文件中
    const targerRouterConfig = router.find(item => {
      let path = item.path.replace(/\s+/g, "");// 移除空白换行符
      //   let path =item.path;
      console.log(path, pathname)
      return path === pathname;
    });

    // (4)判断你访问地址在配置文件中
    /*  if(targerRouterConfig){
      if(targerRouterConfig.auth){
          if(token){
              return <Route path={targerRouterConfig.path} component={targerRouterConfig.component}></Route>
          }else{
              return <Redirect to="/login"></Redirect>
          }
      }else{
          return <Route path={targerRouterConfig.path} component={targerRouterConfig.component}></Route>
      }
    }else{
        return <Redirect to="/404"></Redirect>
    } */
    
    // 页面不存在，
    if (!targerRouterConfig) return <Redirect to='/404'></Redirect>;

    // 存在页面，且无须鉴权，如不需要登陆的页面访问，包括登陆页，注册页，404页
    if (!targerRouterConfig.auth)
      return <Route path={targerRouterConfig.path} component={targerRouterConfig.component}></Route>;
    // 没有token，去登录页
    if (!token) return <Redirect to='/login'></Redirect>;
    // 登陆可访问的页面
    return <Route path={targerRouterConfig.path} component={targerRouterConfig.component}></Route>;


  }
}
