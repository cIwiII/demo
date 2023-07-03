import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from 'umi';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Drawer,
  Radio,
  Popover,
  Tree,
  message,
} from 'antd';
import { IShop, IPutShop } from '@/types/requestParams';
import { putApply } from '@/apis/genApi';
const { Option } = Select;
const CheckTable = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  type RootState = { shopModel: { allShop: any[]; shopTotal: number } };
  const { allShop, shopTotal } = useSelector((state: RootState) => {
    return state.shopModel;
  });
  const [shopReq, setShopReq] = useState<IShop>({
    shopName: '',
    managerName: '',
    idCard: '',
    pageSize: '10',
    pageNum: '1',
    status: '',
  });
  // 获取数据
  const getShopApply = () => {
    dispatch({ type: 'shopModel/asyncGetShopApply', payload: shopReq });
  };
  useEffect(() => {
    getShopApply();
  }, [shopReq]);
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  // 修改
  const putChargePage = async (obj: any, num: number) => {
    let { id, shopName, tel, address, managerName, idCard, licenceNo, status } =
      obj;

    status = num ? '同意' : '拒绝';

    const newobj: IPutShop = {
      id,
      shopName,
      tel,
      address,
      managerName,
      idCard,
      licenceNo,
      status,
    };
    console.log('要修改的参数', newobj);
    const res = await putApply(newobj);
    if (res.status == 200) {
      setShopReq({ ...shopReq });
    } else {
      message.warn('网络波动稍后尝试');
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 40,
      fixed: 'left',
    },
    {
      title: '商铺名称',
      dataIndex: 'shopName',
      width: 100,
    },

    {
      title: '手机号码',
      dataIndex: 'tel',
      width: 100,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 100,
    },
    {
      title: '申请人姓名',
      dataIndex: 'managerName',
      width: 80,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      width: 120,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: 60,
    },
    {
      title: '营业执照编号',
      dataIndex: 'licenceNo',
      width: 100,
    },
    {
      title: '营业执照',
      dataIndex: 'licenceImg',
      render: (img) => (
        <img src={img} alt="" style={{ width: '30px', height: '30px' }} />
      ),
      width: 80,
    },
    {
      title: '操作',
      width: 60,
      fixed: 'right',
      render: (row) => {
        if (row.status == '审核中') {
          return (
            <>
              <Button
                onClick={() => putChargePage(row, 1)}
                size="small"
                type="link"
                style={{ border: '1px solid' }}
              >
                同意
              </Button>
              <Button
                onClick={() => putChargePage(row, 0)}
                size="small"
                type="link"
                style={{ border: '1px solid' }}
              >
                拒绝
              </Button>
            </>
          );
        } else {
          return null;
        }
      },
    },
  ];
  // 查询方法//点击查询
  const onFinish = (values: any) => {
    setShopReq(values);
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    const obj = shopReq;
    obj.shopName = '';
    obj.managerName = '';
    obj.idCard = '';
    obj.status = '';
    setShopReq({ ...obj });
  };
  // 分页切换
  // 页数变化

  const changePageNum = (pageNum: number, pageSize: number) => {
    const newobj: IShop = { ...shopReq };
    if (newobj.pageSize !== pageSize.toString()) {
      newobj.pageSize = pageSize.toString();
      newobj.pageNum = '1';
      setCurrent(1);
    } else {
      newobj.pageNum = pageNum.toString();
      setCurrent(pageNum);
    }
    setShopReq(newobj);
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
          <Input style={{ width: 120 }} />
        </Form.Item>
        <Form.Item name="managerName" label="负责人">
          <Input style={{ width: 120 }} />
        </Form.Item>
        <Form.Item name="idCard" label="身份证号">
          <Input style={{ width: 170 }} />
        </Form.Item>
        <br></br>
        <Form.Item name="status" label="审核状态">
          <Select allowClear style={{ width: 100 }}>
            <Option value="同意">同意</Option>
            <Option value="拒绝">拒绝</Option>
            <Option value="审核中">审核中</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="small">
            查询
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ marginLeft: '20px' }}
            size="small"
          >
            重置
          </Button>
        </Form.Item>
      </Form>
      <Table
        rowSelection={{ checkStrictly }}
        scroll={{ x: 1500 }}
        columns={columns}
        dataSource={allShop}
        rowKey="tel"
        pagination={{
          total: shopTotal,
          onChange: changePageNum,
          current: current,
        }}
      />
      ;
    </>
  );
};

export default CheckTable;
