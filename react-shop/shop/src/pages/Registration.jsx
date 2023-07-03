import React from "react";
import lRStyle from "@/assets/less/logReg.module.less";
import { useHistory, Link } from "react-router-dom";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import logoPNG from "@/assets/img/logo-250px.png";

import { useDispatch, useSelector } from "react-redux";
import { asyncAddUser } from "@/redux/actions";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async values => {
    if (values.password === values.passwordAgain) {
      const obj = {
        account: values.username,
        password: parseInt(values.password),
        email: "12345678@163.com",
        role: "5fc783d126420000dc00503b"// 默认普通管理员
      };
      const res = await dispatch(asyncAddUser(obj));
      if (res) {
        message.success("注册成功，请登录");
        history.replace("/login");
      } else {
        message.error("网络异常，请稍后重试");
      }
    } else {
      console.log("两次密码不一致");
    }
  };
  return (
    <div className={lRStyle.bgimg}>
      <div className={lRStyle.logReg}>
        <img src={logoPNG} alt='' />
        <Form name='normal_login' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name='username' rules={[{ required: true, message: "请输入用户名" }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: "请输入密码！" }]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>

          <Form.Item name='passwordAgain' rules={[{ required: true, message: "请确认密码！" }]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password again'
            />
          </Form.Item>

          <Form.Item>
            <div className={lRStyle.forget}>
              <div>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
              </div>
              <div>
                <Link to='' className='login-form-forgot'>
                  忘记密码？
                </Link>
              </div>
            </div>
          </Form.Item>

          <Form.Item className={lRStyle.lg}>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              注册
            </Button>
            <div className={lRStyle.lging}>
              或者
              <Link to='/login'>已有账号去登录</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
