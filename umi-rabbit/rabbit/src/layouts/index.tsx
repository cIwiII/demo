import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb,MenuProps } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from "umi"
import './home.less'
import { IUserMenu } from '../types/basic'
import logo from '@/assets/logo.png'
import { createFromIconfontCN } from '@ant-design/icons';

export default function _layout(props: any) {
  if (props.location.pathname === '/login') {
    return <div>{props.children}</div>
  }
  if (props.location.pathname === '/404') {
    return <div>{props.children}</div>
  }
  if (props.location.pathname === '/') {
    history.replace('/home')
  }
  // --------------------
  const { Header, Sider, Content, Footer } = Layout;
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  //面包屑数据定义
  const [bread, setBread] = useState<string[]>([])
  // 所有一级菜单path（key）的值
  const [oneMenu,setOneMenu]=useState<string[]>([])
  //菜单存储
  type RootState = { userModel: { userMenu: any[] } }
  const { userMenu } = useSelector((state: RootState) => {
    // console.log(state.userModel);
    return state.userModel
  })
  useEffect(() => {
    // console.log("4---组件挂载完毕");
    dispatch({ type: "userModel/getmenu" })
    dispatch({ type: "userModel/getUserAuth" })
  }, [])
   useEffect(() => {
  const arr:string[]= userMenu.map(v=>v.path)
  setOneMenu(arr)
  }, [userMenu])
  // 自定义图标
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      "//at.alicdn.com/t/c/font_3613443_3nf82xb9o86.js",//
      '//at.alicdn.com/t/c/font_3620139_zfusdlhy3o.js'
    ],
  });
  const menuRender = (menu: IUserMenu[] | undefined) => {
    const arr: any = menu?.map((v: IUserMenu) => {
      let obj = {}
      if(v.name=='个人中心'){}
      else if (v.children) {
        obj = {
          key: v.path,
          icon: <IconFont type={`icon-${v.icon}`} />,
          label: v.name,
          children: menuRender(v.children)
        }
      } else {
        obj = {
          key: v.path,
          icon: <IconFont type={`icon-${v.icon}`} />,
          label: v.name,
        }
      }
      return obj
    })
    // console.log(arr)
    return arr
  }
  //默认打开
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (oneMenu.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  //pathname转面包屑
  const breadFun = (arr: any[], path: string) => {
    const obj = userMenu.find(v => v.path == path)
    bread.push(obj.name)
    setBread(bread)
    if (obj.children) {
      const str = arr[bread.length - 1] + '/' + arr[bread.length]
      breadFun(obj.children, str)
    }
  }
  //被选中
  const chooseMuenu = (a: any) => {
    console.log('key包含paht和name', a.key)
    history.push(a.key)
    // const path = props.history.location.pathname
    // if (path != '/home') {
    //   const arr = path.split('/').shiift()

    //   const obj2 = obj1.children.find(v => v.path == arr[2])
    // }

    // console.log(props)
  }
  // 退出登录
const quit=()=>{
  const res=window.confirm('是否确认注销?')
  if(res){
    history.replace('/login')
  }
  
}

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth='50' className='sider'>
        <div className='logo'>
          <img src={logo} alt="" />
          <div className='car'>海洋养车</div>
        </div>
        <div className='menu'>
          <Menu
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onSelect={chooseMuenu}
            mode="inline"
            theme="dark"
            items={(menuRender(userMenu) as any)}
          />
        </div>

      </Sider>
      <Layout className="site-layout rightCon">
        <Header className="site-layout-background Header">

          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <div className='userInfo'>
            <img src={`http://xawn.f3322.net:8002/distremote/static/avatar/${localStorage.getItem('userimg')}`} alt="" />
            <span>{localStorage.getItem('username')}</span>
            <div className='layuser'>
              <div></div>
              <ul>
                <li onClick={()=>history.push('/profile')}>个人中心</li>
                <li>密码修改</li>
                <li className='li3'>系统定制</li>
                <li onClick={quit}>退出登录</li>
              </ul>
            </div>
          </div>

        </Header>
        <Content className="site-layout-background content">
          {
            props.location.pathname === '/home' ? null : <Breadcrumb style={{ margin: '8px -8px' }}>
              <Breadcrumb.Item href='/home'>主页</Breadcrumb.Item>
              <Breadcrumb.Item>system</Breadcrumb.Item>
              <Breadcrumb.Item>management</Breadcrumb.Item>
              {/* {
                bread.map(v => {
                  return (<Breadcrumb.Item>{{ v }}</Breadcrumb.Item>)
                })
              } */}

            </Breadcrumb>
          }

          <>
            {props.children}
          </>
          <Footer style={{ textAlign: 'center', padding: '10px 0', margin: '0 -20px' }}>Copyright  ©2022 admin</Footer>
        </Content>

      </Layout>
    </Layout>
  );
};





// import React from 'react'

// export default function(props:any) {

//   return (
//     <div>fdfsdf
//         {props.children}
//     </div>
//   );
// }
