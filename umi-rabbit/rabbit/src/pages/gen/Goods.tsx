import { Table, Button, Form, Input, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from 'umi';
import { shopCate } from '@/apis/genApi';
const { Option } = Select;


const Goods = () => {
  const dispatch = useDispatch();
  const [cate, setCate] = useState<any[]>([]);
  type RootState = { productModel: { allShop: any[] } };
  const { allShop } = useSelector((state: RootState) => {
    return state.productModel;
  });
  const [shoppingReq, setShoppingReq] = useState({
    pageSize: '10',
    pageNum: '1',
    name: '',
    sortField: '',
    sortOrder: '',
    status: '',
    goodstypeId: '',
  });
  const getShopping = () => {
    dispatch({ type: 'productModel/asyncGetShop', payload: shoppingReq });
  };
  const getCate = async () => {
    const res: any = await shopCate();
    console.log(res);
    if (res.rows) {
      setCate(res.rows.children);
    } else {
      message.error('账户异常');
    }
  };
  useEffect(() => {
    getCate();
  }, []);
  useEffect(() => {
    // 获取数据
    getShopping();
  }, [shoppingReq]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '图片',
      dataIndex: 'photo',
      render: (td, row, roeindex) => {
        return (
          <img src={td} alt="" style={{ width: '30px', height: '30px' }} />
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 350,
    },
    {
      title: '商品类型',
      dataIndex: 'goods_type_id',
    },
    {
      title: '服务类型',
      dataIndex: 'gname',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => (status == 1 ? '启用' : '停用'),
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '数量',
      dataIndex: 'counts',
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const locales = {
    selectionAll: '全选所有',
    selectInvert: '反选当页',
    selectNone: '清空所有',
  };
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
    shoppingReq.name = values.name || '';
    shoppingReq.status = values.status || '';
    shoppingReq.goodstypeId = values.goodstypeId || '';
    console.log(shoppingReq);
    setShoppingReq({ ...shoppingReq });
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Form
        name="control-hooks"
        layout="inline"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item name="name" label="商品名称">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="商品状态">
          <Select placeholder="" allowClear style={{ width: '200px' }}>
            <Option value="1">上架</Option>
            <Option value="2">下架</Option>
          </Select>
        </Form.Item>
        <Form.Item name="goodstypeId" label="商品类型">
          <Select placeholder="" allowClear style={{ width: '200px' }}>
            {cate.map((v) => {
              return (
                <Option value={v.id} key={v.title}>
                  {v.title}
                </Option>
              );
            })}
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={allShop}
        locale={locales}
      />
    </>
  );
};

export default Goods;
