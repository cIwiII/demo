import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Select, Card, Input, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { asyncGetRoleList, asyncAddUser } from "@/redux/actions";

const { Option } = Select;
// 表单宽度设置
const formItemLayout = {
  labelCol: {
    span: 6,
    offset: 3
  },
  wrapperCol: {
    span: 8
  }
};

export default function AddUser(props) {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => {
    return state.UserRD;
  });
  useEffect(() => {
    dispatch(asyncGetRoleList());
  }, []);

  //获取添加信息对象
  const onFinish = async obj => {
    obj.password = parseInt(obj.password);
    const res = await dispatch(asyncAddUser(obj));
    if (res) {
      props.history.replace("/home/user");
    }
  };
  return (
    <Card title='添加' extra={<Link to='/home/user'>返回</Link>}>
      <Form name='validate_other' {...formItemLayout} onFinish={onFinish}>
        <Form.Item name='account' label='用户名字' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='password' label='用户密码' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name='role' label='用户角色' hasFeedback rules={[{ required: true, message: "请选择分类!" }]}>
          <Select placeholder='请选择分类'>
            {roles.map(v => {
              return (
                <Option key={v._id} value={v._id}>
                  {v.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
          <Button type='primary' htmlType='submit'>
            确认添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
