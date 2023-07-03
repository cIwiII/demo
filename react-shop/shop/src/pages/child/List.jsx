import React, { useEffect, useState } from 'react'
import { message, Table,  Card } from 'antd';
import { findGoods, deleteGoods } from '../../api/goodsMsApi'
import { Link } from "react-router-dom";
import Search from '../../components/Search';
export default function List() {
  const [data, setData] = useState([])

  useEffect(() => {
    getGoods()
  }, [])
  //获取分类数据
  const getGoods = async () => {
    const res = await findGoods()
    // console.log(res)
    setData(res.data.reverse())
  }
  //切换上下架,暂无api
  const changeState = async () => {
    // const res=await 
  }
  //删除商品
  const deleGoods = async (id) => {
    const res = await deleteGoods(id)
    //  debugger
    if (res.code === 1) {
      message.success(res.msg)
      getGoods()
    }
    else { message.error(res.data.msg) }
  }


  const columns = [
    {
      title: '商品名字',
      dataIndex: 'name',
      render: (text) => <button>{text}</button>,
    },
    {
      title: '商品描述',
      width: '40rem',
      dataIndex: 'title',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      render: (text) => <div>{text.name}</div>
    },
    {
      title: '商品状态',
      dataIndex: 'state',
      render: (text, rowObj) => <div onClick={() => changeState(rowObj._id)}>{text === 1 ? <button>点击下架</button> : <button>点击上架</button>}</div>
    },
    {
      title: '操作',
      align: 'center',
      width:'20rem',
      render: (params1, rowObj) => (
        <>
        <button>修改</button>&nbsp;
          <button onClick={() => deleGoods(rowObj._id)} >删除</button>&nbsp;
          <button>详情</button>
        </>
          
        
      ),
    },
  ];

  return (
    <Card
      title={<Search putdata={setData}></Search>}
      extra={<Link to='/home/product/add'>添加</Link>}
    >
      <Table columns={columns} dataSource={data} rowKey='_id' />
    </Card>

  )
}
