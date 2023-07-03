

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from "umi"

const Goodstype = () => {
  const dispatch = useDispatch()
  type RootState = { productModel: { allShopCate: any[] } }
  const { allShopCate } = useSelector((state: RootState) => {
    return state.productModel
  })
  const [shoppingReq,setShoppingReq]=useState({
    pageSize: '10',
    pageNum: '1',
    name: '',
    sortField: '',
    sortOrder: '',
    status: '',
    goodstypeId: '',
  })
  const getShopping=()=>{
    dispatch({ type: 'productModel/asyncGetCate',payload:shoppingReq })
  }
  useEffect(() => {
    // 获取数据
    getShopping()
  }, [shoppingReq])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (row) => '删除'
    },

  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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

  return <Table rowSelection={rowSelection} columns={columns} dataSource={allShopCate} locale={locales} />;
};

export default Goodstype
