import { getUserList, addUser, delUser } from "@/api/userApi";
import { findRoles, deleteRoles } from "@/api/roleApi";
import { message } from "antd";

//用户列表
const getTabData = arr => {
  return {
    type: "GETUSERLIST",
    payload: arr
  };
};
export const asyncGetUserList= () => {
  return async dispatch => {
    const res = await getUserList();
    if (res.code === 1) {
      dispatch(getTabData(res.data));
      return true;
    } else {
      message.error("网络异常，获取用户列表失败");
      return false;
    }
  };
};

//用户添加
export const asyncAddUser = values => {
  return async dispatch => {
    const res = await addUser(values);
    if (res.code === 1) {
      dispatch(asyncGetUserList());
      return true;
    } else {
      return false;
    }
  };
};

// 删除用户
export const asyncDeleteUser = id => {
  return async dispatch => {
    const res = await delUser(id);
    if (res.code === 1) {
      message.success("删除成功");
      dispatch(asyncGetUserList());
    } else {
      message.error("删除失败");
    }
  };
};

// 角色信息获取
const getRole = arr => {
  return {
    type: "GETROLE",
    payload: arr
  };
};
export const asyncGetRoleList = () => {
  return async dispatch => {
    const res = await findRoles();
    if (res.code) {
      dispatch(getRole(res.data));
      return false;
    } else {
      message.error("网络异常，角色获取失败");
      return false;
    }
  };
};

// 删除角色
export const asyncDeleteRole = id => {
  return async dispatch => {
    const res = await deleteRoles({ id });
    // 删除成功继续查询,在查询一次最新的数据，删除失败提示失败
    if (res) {
      dispatch(asyncGetRoleList());
      message.error('删除成功')
    } else {
      message.error("删除失败");
    }
  };
};
