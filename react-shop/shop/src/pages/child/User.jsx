import React, { useEffect, useState } from "react";
import { Table, Card, message } from "antd";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteUser, asyncGetUserList } from "@/redux/actions";
export default function User() {
  // const [data, setData] = useState([])//仓库前
  const dispatch = useDispatch();

  const { users } = useSelector(state => {
    return state.UserRD; //返回的是多个对象，解构出需要的数据
  });

  useEffect(() => {
    dispatch(asyncGetUserList());
  }, []);
  //删除用户
  const deteUser = id => {
    dispatch(asyncDeleteUser(id));
  };
  const columns = [
    {
      title: "用户名字",
      dataIndex: "account",
      render: text => <a>{text}</a>
    },
    {
      title: "邮箱地址",
      dataIndex: "email"
    },
    {
      title: "角色",
      dataIndex: "role",
      render: text => <div>{text ? text.name : "不是管理员"}</div>
    },
    {
      title: "操作",
      render: (val, rowObj) => (
        <div
          onClick={() => {
            deteUser(rowObj._id);
          }}>
          删除
        </div>
      )
    }
  ];
  return (
    <div>
      <Card title={<Link to='/home/adduser'>添加用户</Link>} extra=''>
        <Table columns={columns} dataSource={users} rowKey={"_id"} />
      </Card>
    </div>
  );
}
