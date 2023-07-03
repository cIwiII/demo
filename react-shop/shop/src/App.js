import React, { Component } from 'react'

import {
  BrowserRouter,HashRouter,Route, Switch,Redirect
} from "react-router-dom";
import RouterAuth from './components/RouterAuth'
// 懒加载
// import Login from './pages/login/login';
// import Registration from './pages/registration/registration';
export default class App extends Component {
  render() {
    return (
      <div id='App'>
        <React.Suspense fallback={<div>加载中...</div>}>
          <BrowserRouter>
            <Switch>
            <Redirect exact from='/' to='/home'></Redirect>
            <RouterAuth></RouterAuth>
              {/* <Redirect exact from='/' to='/home'></Redirect>
              <Route path='/home' component={Home}></Route>
              <Route path='/login' component={React.lazy(()=>import("./pages/login/Login"))}></Route>
              <Route path='/registration' component={React.lazy(()=>import("./pages/registration/Registration"))}></Route> */}
            </Switch>
          </BrowserRouter>
        </React.Suspense>

      </div>
    )
  }
}