


import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { DataNode } from 'antd/es/tree';
import React, { useState, useEffect } from 'react';
import { IPutServe } from '@/types/serveReq'
import { useDispatch, useSelector, history } from "umi"
import { servicetype,putService, addService,deleService } from "@/apis/genApi"
import { Button, Form, Input, Select, DatePicker, Drawer, Radio, Popover, Tree, message } from 'antd';
const Category = () => {
  const dispatch = useDispatch()
  const [deleArr,setDeleArr]=useState<any[]>([])
  type RootState = { serveModel: { allServe: any[],serveNum:number } }
  const { allServe,serveNum } = useSelector((state: RootState) => {
    return state.serveModel
  })
  // 获取数据
  const getServe = (name: string) => {
    dispatch({ type: 'serveModel/asyncGetServe', payload: name })
  }
  // 修改对象
  const [serveCate, setServeCate] = useState<IPutServe>({
    name: '',
    parentId: '',
    id: '',
  })
  useEffect(() => {
    getServe('')
  }, [])
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  // 修改
  const putSeverCate = async (obj: any) => {

    // let { id, shopName, tel, address, managerName, idCard, licenceNo, status } = obj

    // const newobj: IPutShop = { id, shopName, tel, address, managerName, idCard, licenceNo, status }
    console.log('要修改的参数', obj);
    // const res = await putApply(newobj)
    // if (res.status == 200) {
    //     shopReq.pageNum = '1'
    //     setCurrent(1)
    //     setShopReq({ ...shopReq })
    // } else {
    //     message.warn('网络波动稍后尝试')
    // }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '操作',
      render: (row) => {
        return (<>
          <Button onClick={() => putSeverCate(row)} size='small' type="link" style={{ border: '1px solid' }}>修改</Button>
        </>)
      }
    },

  ];
  const [checkStrictly, setCheckStrictly] = useState(false);
  //点击查询
  const onFinish = (values: any) => {
    if (!values.name) { values.name = '' }
    getServe(values.name)
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    getServe('')
  };
  // 删除
  // 表格选中
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    let newarr: number[] = []
    newSelectedRowKeys.forEach(v => {
      newarr.push(Number(v))
    })
    console.log('将要删除的对象id数组: ', newarr);
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

  // 
  // ---抽屉----
  const [visible, setVisibleDrawer] = useState(false);
  const showDrawer = () => {
    setVisibleDrawer(true);
    dispatch({ type: 'userModel/asyncGetRole' })
  };

  const onClose = () => {
    setVisiblePopover(false);
    setVisibleDrawer(false);
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const content = (
    <div>
      <Button onClick={() => setVisiblePopover(false)}>取消</Button>
      <Button type="primary" onClick={onClose}>确认</Button>
    </div>
  );

  // 抽屉内表单
  const layoutModal = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const validateMessagesModal = {
    required: '${label} 未填写',
    types: {
      email: '${label} 格式不正确!',
    },
  };
  // 汽包
  const [visiblePopover, setVisiblePopover] = useState(false);
  const handleVisibleChange = (newVisible: boolean) => {
    setVisiblePopover(newVisible);
  };
  // 删除选中
  const deleUSers = async () => {
    const lastRes = window.confirm('是否确认删除所选数据，删除后不可恢复，谨慎操作?')
    if (!lastRes) { return }
    if(!deleArr[0]){return}
    const res=await deleService(deleArr[0])
    const res2:any=await servicetype('')
    console.log('删除返回',res2.total!=serveNum,res2.total,serveNum);
    if(res.status==200 && res2.total!=serveNum){
      message.success('删除成功')
      getServe('')
    }
  }
  // 添加的上级id树形控件方法
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const onCheck = (checkedKeysValue: any, e: any) => {
    console.log('onCheck', checkedKeysValue);
    // console.log('onCheck2', e);
    setCheckedKeys(checkedKeysValue);
  };
  // 添加表单提交
  const onFinishAddForm = async (values: any) => {
    values.parentId = checkedKeys[0]
    if (!values.parentId) {
      values.parentId = ''
    }
    console.log('提交', values);
    const res = await addService(values)
    console.log(res)
    if (res.status == 200) {
      message.success('添加成功')
      onClose()
      getServe('')
    }
  };
  return (<>
    <Form
      name="control-hooks"
      layout="inline"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item name="name" label="用户名">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size='small'>
          查询
        </Button>
        <Button htmlType="button" onClick={onReset} style={{ marginLeft: '10px' }} size='small'>
          重置
        </Button>
      </Form.Item>
    </Form>
    <div style={{ margin: '10px 0' }}>
      <Button type="primary" onClick={showDrawer} size='small'>
        新增
      </Button>
      <Button type="primary" onClick={deleUSers} size='small' style={{ marginLeft: '10px' }}>
        删除
      </Button>
      <Drawer
        title="新增部门"
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
        key='right'
        destroyOnClose={true}
        width={550}
      >
        <Form {...layoutModal} name="nest-messages" onFinish={onFinishAddForm} validateMessages={validateMessagesModal}>
          <Form.Item name='name' label="部门名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name='parentId' label="上级部门" rules={[{ required: false }]}>
            <Tree
              checkable
              onCheck={onCheck}
              treeData={allServe}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Popover placement="top" visible={visiblePopover} onVisibleChange={handleVisibleChange} title='确定放弃编辑？' content={content} trigger="click">
              <Button>取消</Button>
            </Popover>

            <Button htmlType="submit" type="primary">
              提交
            </Button>

          </Form.Item>
        </Form>
      </Drawer>

    </div>
    <Table rowSelection={rowSelection} columns={columns} dataSource={allServe} rowKey='id' />;
  </>)
};

export default Category
