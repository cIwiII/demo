import React, { useState, useEffect, useMemo } from 'react'
import { Layout, Breadcrumb, Menu, } from 'antd';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { menuList, defalutOpenTopMunes } from '../const/menus';
import SelectComp from "../components/WithRouter";
import s from '@/assets/less/home.module.less'
import logo from "@/assets/img/logo-250px.png"

import Main from './child';
import Role from './child/Role';
import List from './child/List';
import Category from './child/Category';
import AddProduct from './child/AddProduct';
import Shop from './child/Shop';
import User from './child/User';
import AddUser from './child/AddUser';
import Salary from './child/Salary';
import Sale from './child/Sale';


// this.props.location.pathname===v.path?s.active:null
const { Header, Sider, Content } = Layout;
export default function Home(props) {
  console.log(props);
  //元数据
  // eslint-disable-next-line

  //面包屑二级菜单
  // const bread2=useMemo(()=>{

  // })

  const [bread2, setBread2] = useState(null)
  //打开的菜单数据
  const [openMenu, setOpenMenu] = useState(defalutOpenTopMunes)
  //顶部tab菜单，点击菜单跳转,同时加到openMenu
  const linkTo = ({ item }) => {
    const id = item.props.index
    const obj = menuList.find(v => v.id === id)
    if (obj) { //一级菜单
      props.history.push(obj.path);
      setBread2(obj.name)
      if (!(openMenu.find(val => val.id === id || id === '0'))) {

        openMenu.push(obj)
        setOpenMenu(openMenu)
        return
      } else if (id === '0') { setBread2(null) }
    } else { //非一级菜单
      menuList.forEach(v => {
        if (v.children) {
          const index = v.children.findIndex(val => val.id === id)

          if (index !== -1) {
            setBread2(v.children[index].name)
            props.history.push(v.children[index].path);
            if (!(openMenu.find(val => val.id === id))) {
              openMenu.push(v.children[index])
              setOpenMenu(openMenu)
            }

          }
        }
        return
      })
    }
  }
  // 初始化菜单
  const [userInfo, setUserInfo] = useState({ role: {} })
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.userInfo || "{}")
    setUserInfo(userInfo)
  }, [])
  useEffect(() => {
    // console.log(userInfo);
  }, [userInfo])
  //动态菜单
  function renderMenus(arr) {
    const { menus } = userInfo.role
    return arr.map(v => {
      // 判断当前用户的menus是否在我们指定menus里面
      if (menus && menus.indexOf(v.path) !== -1) {
        if (!v.children) {
          return (
            <Menu.Item key={v.name} icon={v.icon} className={v.path === props.location.pathname ? s.active : null} index={v.id} >{v.name}</Menu.Item>
          )
        } else {
          return (
            <Menu.SubMenu key={v.name} icon={v.icon} title={v.name}>
              {renderMenus(v.children)}
            </Menu.SubMenu>
          )
        }
      } else { return null }
    })
  }
  return (
    <Layout className={s.home}>
      <Header className={s.header}>
        <img src={logo} alt="" />
        <div className={s.tab}>
          {
            openMenu?.map(v => {
              return (
                v.id === '0' ? <div key={v.id} style={{ paddingRight: '2rem' }} className={props.location.pathname === v.path ? s.active : null}><Link to={{ pathname: '/home/index' }}>首页</Link></div>
                  : <div key={v.id} className={props.location.pathname === v.path ? s.active : null}><Link to={{ pathname: v.path }}>{v.name}</Link><button data-v={v.id}>×</button></div>
              )
            })
          }
        </div>
        <div className={s.logHead}>
          <span>欢迎登录</span>
          {
            localStorage.getItem('username')?
            <span className={s.username}>
              {localStorage.getItem('username')}
              <div className={s.selectComp}>
                <SelectComp/>
              </div>
            </span>:
            <Link to={{ pathname: '/login' }}>去登录</Link>
          }
          
        </div>

      </Header>
      <Layout className={s.main}>
        <Sider>
          <Menu
            defaultOpenKeys={['商品管理', '信息统计']}
            selectable='false'
            mode="inline"
            onClick={linkTo}
            theme="dark"
          >{renderMenus(menuList)}
          </Menu>
        </Sider>
        <Content className={s.contents}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={{ pathname: '/home' }}>首页</Link>
            </Breadcrumb.Item>
            {
              bread2 ? <Breadcrumb.Item>{bread2}</Breadcrumb.Item> : null
            }
          </Breadcrumb>
          <div className={s.content}>
            <Switch>
              <Redirect exact from='/home' to='/home/index'></Redirect>
              <Route path='/home/index' component={Main}></Route>
              <Route path='/home/user' component={User}></Route>
              <Route path='/home/adduser' component={AddUser}></Route>
              <Route path='/home/role' component={Role}></Route>
              <Route path='/home/shop' component={Shop}></Route>
              <Route path='/home/product/list' component={List}></Route>
              <Route path='/home/product/add' component={AddProduct}></Route>
              <Route path="/home/product/category" component={Category}></Route>
              <Route path="/home/charts/salary" component={Salary}></Route>
              <Route path="/home/charts/sale" component={Sale}></Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>


  )
}

