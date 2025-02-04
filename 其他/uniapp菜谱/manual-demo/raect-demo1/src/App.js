import React, { Component } from 'react'
import { HashRouter,BrowserRouter, Switch, Route, Link,Redirect,NavLink } from "react-router-dom"

/* import Loadable from 'react-loadable'  // 插件导入
const Login = Loadable({   //懒加载处理，Route中使用 Login 对象
  loader:()=>import("./pages/Login"),
  loading:()=><div>加载中。。。。</div>
}) */


import Test from "./pages/Test";
import ReduxTest from "./pages/reduxTest";
import ListDownload from "./pages/listDownload";
import Hook from './pages/Hook/Context';
import Transition from './pages/Hook/Transition';
import UseId from './pages/Hook/UseId';
import Lazy from './pages/lazy';
import ENV from './pages/ENV';
import UncontrolledLottie from './pages/Lottie/UncontrolledLottie';
import ControlledLottie from './pages/Lottie/ControlledLottie';

function App() {
  return (
    <div className='App'>
      {/* <Test></Test> */}
      {/* <ReduxTest></ReduxTest> */}
      {/* <ListDownload></ListDownload> */}
      <Hook></Hook>
      <Lazy></Lazy>
      <Transition></Transition>
      <UseId></UseId>
      <ENV></ENV>
      <UncontrolledLottie></UncontrolledLottie>
      {/* <ControlledLottie></ControlledLottie> */}
     {/*  <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </BrowserRouter> */}
    </div>
  );
}

export default App;
