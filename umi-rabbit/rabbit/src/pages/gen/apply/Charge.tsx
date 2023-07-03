
import Search from '@/components/Search'
// import CheckTable from '@/components/CheckTable'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useDispatch, useSelector, history } from "umi"
import type { DataNode } from 'antd/es/tree';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import React, { useState, useEffect } from 'react';
import { ICharge, IAddRole } from '@/types/requestParams'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Drawer, Radio, Popover, Tree, message } from 'antd';
import { putCharge } from '@/apis/genApi'

const Charge = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch()
  const [chargeReq, setChargeReq] = useState<ICharge>({
    pageSize: '10',
    pageNum: '1',
    shopName: '',
    tel: '',
    managerName: '',
    idCard: '',
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  type RootState = { chargeModel: { allChargeApply: any[], chargeTotal: number } }
  const { allChargeApply, chargeTotal } = useSelector((state: RootState) => {
    return state.chargeModel
  })
  // 获取数据
  const getCharge = () => {
    dispatch({ type: 'chargeModel/asyncGetChargeApply', payload: chargeReq })
  }
  useEffect(() => {
    getCharge()
  }, [chargeReq])
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  const columns: ColumnsType<DataType> = [

    {
      title: '充电站名称',
      dataIndex: 'shopName',

    },
    {
      title: '电话',
      dataIndex: 'tel',

    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',

    },
    {
      title: '负责人',
      dataIndex: 'managerName',

    },
    {
      title: '执照号',
      dataIndex: 'licenceNo',

    },
    {
      title: '状态',
      dataIndex: 'status',

    },
    {
      title: '执照图片',
      dataIndex: 'licenceImg',
      render: (td, row) => {
        return <img src={td} alt="" style={{ width: '30px', height: '30px' }} />
      }

    },
    {
      title: '操作',
      render: (row) => {
        if (row.status == '审核中') {
          return <>
            <Button onClick={() => putChargePage(row, 1)} size='small' type="link" style={{ border: '1px solid' }}>通过</Button>
            <Button onClick={() => putChargePage(row, 0)} size='small' type="link" style={{ border: '1px solid' }}>拒绝</Button>
          </>
        } else { return null }
      }


    },

  ];
  // 点击顶部删除
  // 删除选中
  const [deleArr, setDeleArr] = useState<number[]>([])
  const deleCharge = () => {
    console.log('删除id数组', deleArr);

    // dispatch({ type: 'userModel/asyncDeleUsers', payload: deleArr })
  }
  // 改变将要删除的数组
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    let newarr: number[] = []
    newSelectedRowKeys.forEach(v => {
      newarr.push(Number(v))
    })
    setDeleArr(newarr)
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const locales = { selectionAll: '全选所有', selectInvert: '反选当页', selectNone: '清空所有' }
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  // 查询方法//点击查询
  const onFinish = (values: any) => {
    setChargeReq(values)
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    setChargeReq({
      pageSize: '10',
      pageNum: '1',
      shopName: '',
      tel: '',
      managerName: '',
      idCard: '',
    })
  };
 
  // 分页切换
  // 页数变化
  const [current, setCurrent] = useState(1)
  const changePageNum = (pageNum: number, pageSize: number) => {
    const newobj: ICharge = { ...chargeReq }
    if (newobj.pageSize !== pageSize.toString()) {
      newobj.pageSize = pageSize.toString()
      newobj.pageNum = '1'
      setCurrent(1)
    } else {
      newobj.pageNum = pageNum.toString()
      setCurrent(pageNum)
    }
    setChargeReq(newobj)
  }
   // 修改
   const putChargePage = async (obj: any, num: number) => {
    console.log('要修改的的对象', obj);
    if (num) {
      obj.status = '通过'
    } else {
      obj.status = '拒绝'
    }
    const res = await putCharge(obj)
    if(res.status==200){
      chargeReq.pageNum = '1'
      setCurrent(1)
      setChargeReq({ ...chargeReq })
    }else{
      message.warn('网络波动稍后尝试')
    }
  }
  return (
    <>
      <Form
        name="control-hooks"
        layout="inline"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item name="shopName" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="tel" label="手机号">
          <Input />
        </Form.Item>
        <Form.Item name="managerName" label="负责人">
          <Input />
        </Form.Item>
        <Form.Item name="idCard" label="身份证号">
          <Input />
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
      <div style={{ margin: '10px 0' }}>
        <Button type="primary" onClick={() => { message.warn('前往登录页申请') }} size='small'>
          新增
        </Button>
        <Button type="primary" onClick={deleCharge} size='small' style={{ marginLeft: '10px' }}>
          删除
        </Button>
      </div>
      <Table rowSelection={rowSelection} locale={locales} pagination={{
        total: chargeTotal, onChange: changePageNum, current: current,
      }} columns={columns} dataSource={allChargeApply} rowKey='id' />;
    </>
  )
};

export default Charge
