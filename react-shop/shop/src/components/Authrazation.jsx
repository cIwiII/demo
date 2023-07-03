/** 角色授权模态框展示 */
import { Modal, Tree } from "antd";
import React, { useState, useEffect } from "react";
import {putAuth} from "../api/roleApi"
import {treeData} from "../const/menus"

const Authrazation = props => {
  //修改授权的数组
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    setMenus(props.row.menus);
    // eslint-disable-next-line
  }, []);
  const onCheck = (checkedKeysValue, info) => {
    console.log("onCheck半选", checkedKeysValue, info.halfCheckedKeys);
    const newArr = [...checkedKeysValue, ...info.halfCheckedKeys];
    setMenus(newArr);
  };
  const handleCancel = () => {
    props.setOpen(false);
  };
  const handleOk = async () => {
    if (menus.length === 0) {
      alert("未操作");
      return;
    }
    props.getMenusArr(menus);
    const obj = {
      id: props.row._id,
      authTime: new Date(),
      authUser: "xiaowang",
      menus
    };
    const res = await putAuth(obj);
    console.log(res);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
  };
  return (
    <Modal onOk={handleOk} onCancel={handleCancel} title='授权' visible={true} cancelText='取消' okText='确认'>
      <Tree
        checkable
        defaultExpandedKeys={["/home/product", "/home/charts"]}
        defaultCheckedKeys={props.row.menus}
        onCheck={onCheck}
        treeData={treeData}
        onSelect={onSelect}
      />
    </Modal>
  );
};

export default Authrazation;
