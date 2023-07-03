import React, { useState, useEffect } from 'react'
import { Card, Button, Table, message ,Modal} from "antd"
import { findRoles, putAuth,addRoles ,deleteRoles} from "../../api/roleApi"
import Authrazation from '../../components/Authrazation'

export default function Role(props) {
  const [roles, setRoles] = useState([])
  const [open, setOpen] = useState(false)
  const [openAddModel, setOpenAddModel] = useState(false)
  const [row, setRow] = useState({ menus: [] })
  //存储修改后的menus数组
  const [menus, setMenus] = useState([])

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const res = await findRoles()
    setRoles(res.data)
    // console.log(res);
  }
  const auth = (row) => {
    setOpen(true)
    console.log(row);
    setRow(row)
  }
  //角色授权发生改变自动发送请求修改
  useEffect(() => {
    putrole()
    // eslint-disable-next-line
  }, [menus])
  //授权请求发送
  const putrole = async () => {
    const newRow = {}
    newRow.id = row._id
    newRow.authTime = dataDeal(new Date())
    newRow.authUser = 'xiaoliu222'
    newRow.menus = menus
    const res = await putAuth(newRow)
    if (res.code === 1) {
      message.success(res.msg)
    }
  }
  //日期处理
  const dataDeal = (date) => {
    const Symbols = '-'
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const ms = date.getMilliseconds();
    return year + Symbols + month + Symbols + day + ' ' + hour + ':' + minute + ':' + second + ':' + ms
  }
  //添加角色
  const addroleOk =async () => {
    const val=Role.addroleEle.value
    const createTime=dataDeal(new Date())
    let obj={name:val,createTime}
    const res=await addRoles(obj)
    if(res.code===1){
      message.success(res.msg);
      addModelCancel()
      fetchData()
    }
    else{message.error(res.msg)}
  }
  //关闭添加角色模态
  const addModelCancel=()=>{
    setOpenAddModel(false)
  }
  //删除角色
const deleRoles=async (id)=>{
const res=await deleteRoles(id)
if(res.code===1){message.success(res.msg);fetchData()}
else{message.error(res.msg)}
}
  const columns = [
    {
      title: '角色名字',
      dataIndex: 'name'
    },
    {
      title: '创建日期',
      dataIndex: 'createTime'
    },
    {
      title: '授权人',
      dataIndex: 'authUser',
    },
    {
      title: '授权日期',
      dataIndex: "authTime"
    },
    {
      title: '操作',
      width: "140px",
      render: (text,row) => {
        return (
          <span>
            <Button type='default' onClick={()=>{deleRoles(row._id)}}>删除</Button>&nbsp;&nbsp;
            <Button onClick={() => auth(text)} type="dashed">授权</Button>&nbsp;&nbsp;
          </span>
        )
      }
    }

  ];
  const search = (
    <span>
      <Button type="primary" onClick={()=>setOpenAddModel(true)}>添加角色</Button>&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
  )
  return (
    <div>
      <Card title={search} style={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={roles}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          loading={false}
        />
      </Card>
      {open ? <Authrazation row={row} getMenusArr={(arr) => setMenus(arr)} setOpen={setOpen}></Authrazation> : null}
      {openAddModel?
        <Modal onOk={addroleOk} onCancel={addModelCancel} title="授权" visible={true} cancelText='取消' okText='确认'>
          <input type="text" ref={(a)=>Role.addroleEle=a} placeholder='请输入角色名字' />
        </Modal>:null
      }
    </div>
  )
}
