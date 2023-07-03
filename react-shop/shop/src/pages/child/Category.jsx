import React, { useEffect, useState } from 'react'
import { Table, Card, Modal, Form, Input, Select,Button ,message} from 'antd';
import { findCategroy,addCategroy,deleteCateGroy } from '../../api/goodsCateApi'


const { Option } = Select;

const layout = {labelCol: {span: 6,}, wrapperCol: {span: 16,}};
const tailLayout = {
  wrapperCol: {offset: 9,span: 16, },
};


export default function Product() {
  const [data, setData] = useState([])
  const [parentId, setParentId] = useState(0)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show,setShow] = useState(false)

  const changeParentId=(id)=>{
    setParentId(id)
  }
  useEffect(() => {
    getCate();
   // eslint-disable-next-line
  }, [parentId])
  //获取分类数据
  const getCate = async () => {
    const res = await findCategroy(parentId)
    setData(res.data.data)
  }

  //删除分类
  const deleteCategroy=async (id)=>{
  const res=await deleteCateGroy(id)
    if(res.code===1){message.success(res.msg);getCate()}
    else{message.error(res.msg)}
  }

  // 从这里开始为添加功能
  const openModel = () => {
    setIsModalVisible(true)
  }
  const closeModel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    values.parentId = values.parentId ? values.parentId : 0
    console.log(values);
    const res = await addCategroy(values)
    if (res.code) {
      message.success("添加成功")
      getCate()
      setIsModalVisible(false);
    } else {
      message.error("添加失败")
    }

  }
  const onTypeChange = (val) => {
    console.log(val);
    if (val === "二级分类") {
      setShow(true)
      setParentId(0)
    } else {
      setShow(false)
    }
  }

  const columns = [
    {
      title: '类型名字',
      dataIndex: 'name',
      render: (text) => <button>{text}</button>,
      align: 'center',
    },
    {
      title: '类别',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '操作',
      render: (a,b) => <>
      {parentId===0?<button onClick={() => changeParentId(b._id)} type='primary'>查看子分类列表</button>:null}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={()=>deleteCategroy(b._id)} >删除</button>
      </>
    },
  ];
  return (
    <div>
      <Card
        title={parentId === 0 ? "商品分类信息" : <Button onClick={()=>changeParentId(0)} type='dashed'>返回</Button>}
        extra={parentId===0 ?<Button onClick={openModel} type='default'>添加</Button> : null}
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          rowKey='_id'
        />

      </Card>
      <Modal title="添加分类" visible={isModalVisible} onCancel={closeModel} footer={null} width='40rem' cancelText okText>
        <Form {...layout} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="分类名字"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="分类类型"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="分类类型"
              onChange={onTypeChange}
              allowClear
            >
              <Option value="一级分类">一级分类</Option>
              <Option value="二级分类">二级分类</Option>
            </Select>
          </Form.Item>
          {show ? <Form.Item
            name="parentId"
            label="父级分类"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="分类类型"
              onChange={() => { }}
              allowClear
            >
              {data.map(item => {
                return <Option key={item._id} value={item._id}>{item.name}</Option>
              })}

            </Select>
          </Form.Item> : null}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              确认添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
