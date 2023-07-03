import React from 'react'
import lRStyle from '@/assets/less/logReg.module.less'
import {Link } from "react-router-dom"

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import logoPNG from "@/assets/img/logo-250px.png"
import {login} from '@/api/userApi'
export default function Login(props) {
  const onFinish =async (values) => {
    console.log('登录提交数据 ', values);
    const res=await login(values)
    if(res.code===1){
      const userInfoJSON=JSON.stringify(res.data.userInfo)
      localStorage.setItem('userInfo',userInfoJSON)
      localStorage.setItem('username',res.data.userInfo.account)
      localStorage.setItem('token',res.data.token)
      message.success('登录成功')
      props.history.replace('/home')
    }
    else{
      message.error('账号或密码错误')
    }
    
  };
  return (
    <div className={lRStyle.bgimg}>
      <div className={lRStyle.logReg}>
        <img src={logoPNG}  alt=""  />
        <Form name="normal_login" className="login-form"
          initialValues={{ remember: true, }} onFinish={onFinish}
        ><Form.Item name="account"
          rules={[
            { required: true, message: '请输入用户名', },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！', },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item >
            <div className={lRStyle.forget}>
              <div><Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item></div>
              <div><Link to='' className="login-form-forgot">忘记密码？</Link></div>
            </div>
          </Form.Item>

          <Form.Item className={lRStyle.lg}>
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            <div className={lRStyle.lging}>或者
            <Link to='/registration'>没有账号去注册</Link>
            </div>
          </Form.Item>
        </Form>

      </div>
    </div>

















  )
}

