


import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from "umi"
import { Button, Form, Input, Select, DatePicker, Drawer, Radio, Popover, Tree, message,InputNumber } from 'antd';
import { IShopCharge, IPutShopCharge } from '@/types/requestParams'
import { putShopCharge } from '@/apis/genApi'
const { Option } = Select;
const Shop = () => {
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(1)
  const [checkStrictly, setCheckStrictly] = useState(false);
  type RootState = { shopModel: { allShopCharge: any[], shopChargeTotal: number } }
  const { allShopCharge, shopChargeTotal } = useSelector((state: RootState) => {
    return state.shopModel
  })
  const [shopChargeReq, setShopChargeReq] = useState<IShopCharge>({
    pageSize: '10',
    pageNum: '1',
    shopName: '',
    status: '',
    sortField: '',
    sortOrder: '',
  })
  const getShopCharge = () => {
    dispatch({ type: 'shopModel/asyncGetShopCharge', payload: shopChargeReq })
  }
  useEffect(() => {
    console.log('bianhua');
    getShopCharge()
  }, [shopChargeReq])
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  const changeShopStatus = async (id: string | number, status: string | number) => {
    // 状态num（1：停用，2：启用）
    const res: any = await putShopCharge({ id, status })
    console.log(res);
    if (res.result) {
      getShopCharge()
    } else {
      message.error('警告次数不足，不满足下架条件')
    }
  }
  const columns: ColumnsType<any> = [

    {
      title: '商铺名称',
      dataIndex: 'shopName',
      width: 120

    },
    {
      title: '信誉积分',
      dataIndex: 'prestige',
    },
    {
      title: '商铺状态',
      dataIndex: 'status',
      render: (status, row, rowindex) => {
        if (status != 1) {
          return <div style={{ color: 'red', border: '1px solid red', backgroundColor: '#fff0f6', textAlign: 'center' }}>停用</div>
        } else {
          return <div style={{ color: '#91d5ff', border: '1px solid #91d5ff', backgroundColor: '#e6f7ff', textAlign: 'center' }}>启用</div>
        }
      },
      filters: [
        { text: '启用', value: 1 },
        { text: '停用', value: 2 }
      ],
      filterMultiple: false,
    },
    {
      title: '电话',
      dataIndex: 'telephone',

    },
    {
      title: '商铺类型',
      dataIndex: 'type',
      render: (type) => {
        if (type == 0) {
          return <div style={{ color: '#91d5ff', border: '1px solid #91d5ff', backgroundColor: '#e6f7ff', textAlign: 'center' }}>充电站</div>
        } else {
          return <div style={{ color: '#95de64', border: '1px solid #95de64', backgroundColor: '#f6ffed', textAlign: 'center' }}>商铺</div>
        }
      },
      filters: [
        { text: '充电站', value: 0 },
        { text: '商铺', value: 1 }
      ],
      filterMultiple: false,
      onFilter: (value: any, record: any) => {
        return record.type == value
      }

    },
    {
      title: '门店详情',
      dataIndex: 'address',
      render: () => <Button onClick={() => { }} size='small' type="link">查看详情</Button>


    },
    {
      title: '查看警告',
      render: () => <Button onClick={() => { }} size='small' type="link">查看警告</Button>

    },
    {
      title: '警告',
      render: () => <Button onClick={() => { }} size='small' type="link">警告</Button>

    },
    {
      title: '下架',
      render: (row) => {
        if (row.status == 1) {
          return <Button onClick={() => changeShopStatus(row.id, '1')} size='small' type="link" style={{ border: '1px solid' }}>停用</Button>
        } else {
          return <Button onClick={() => changeShopStatus(row.id, '2')} size='small' type="link" style={{ border: '1px solid' }}>启用</Button>
        }
      }


    },

  ];
  // 查询方法//点击查询
  const onFinish = (values: any) => {
    if(!values.shopName){
      shopChargeReq.shopName=''
    }else{
      shopChargeReq.shopName=values.shopName
    }
    if(!values.status){
      shopChargeReq.status=''
    }else{
      shopChargeReq.status=values.status
    }
    console.log(values);
    setShopChargeReq({...shopChargeReq})
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    setShopChargeReq({
      pageSize: '10',
      pageNum: '1',
      shopName: '',
      status: '',
      sortField: '',
      sortOrder: '',
    })
  };
  // 分页切换
  // 页数变化

  const changePageNum = (pageNum: number, pageSize: number) => {
    const newobj: IShopCharge = { ...shopChargeReq }
    if (newobj.pageSize !== pageSize.toString()) {
      newobj.pageSize = pageSize.toString()
      newobj.pageNum = '1'
      setCurrent(1)
    } else {
      newobj.pageNum = pageNum.toString()
      setCurrent(pageNum)
    }
    setShopChargeReq(newobj)
  }
  // bianhua
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
    const newobj = shopChargeReq
    if (!filters.status) {
      if (newobj.status ==filters.status) { return }//未做修改不发送请求
      newobj.status = ''
    } else {
      if (newobj.status ==filters.status[0]) { return }//未做修改不发送请求
      newobj.status = filters.status[0]
    }
    setShopChargeReq({ ...newobj })
  };
  return (
    <>
      <Form
        name="control-hooks"
        layout="inline"
        onFinish={onFinish}
        form={form}
        style={{ marginBottom: '15px' }}
      >
        <Form.Item name="shopName" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="商铺状态">
          <Select
            allowClear
            style={{ width: 200 }}
          >
            <Option value="1">启用</Option>
            <Option value="2">停用</Option>
          </Select>
        </Form.Item>
        <Form.Item label="积分">
          <InputNumber defaultValue={0}/>~<InputNumber defaultValue={100}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size='small'>
            查询
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ marginLeft: '20px' }} size='small'>
            重置
          </Button>
        </Form.Item>
      </Form>
      <Table rowSelection={{ checkStrictly }} onChange={onChange} columns={columns} dataSource={allShopCharge} rowKey='id' pagination={{
        total: shopChargeTotal, onChange: changePageNum, current: current,
      }} />;
    </>
  )
};

export default Shop
