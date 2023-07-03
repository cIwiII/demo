
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from "umi"
import { Button, Table, Form, Input, Select, DatePicker, Drawer, Radio, Popover, Tree, message } from 'antd';
import { IMenu, IAddMenu } from '@/types/requestParams'
import { addMenu,deleMenu} from '@/apis/menuApi'
const Menu = () => {
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch()
    const [menuReq, setMenuReq] = useState<IMenu>({
        menuName: '',
        createTimeFrom: '',
        createTimeTo: '',
    })
    type RootState = { menuModel: { allMenu: any[] } }
    const { allMenu } = useSelector((state: RootState) => {
        return state.menuModel
    })
    const getMenu = () => {
        dispatch({ type: 'menuModel/asyncGetMenu', payload: menuReq })
    }
    // useEffect(() => {

    // }, [])
    useEffect(() => {//单页显示数量，页数，查询改变发送请求
        getMenu()
    }, [menuReq])
    // 选中
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'title',
            fixed: 'left',
            width: 120,
        },
        {
            title: '图标',
            dataIndex: 'icon',
            width: 150,
        },
        {
            title: '类型',
            dataIndex: 'type', width: 80,
        },
        {
            title: '地址',
            dataIndex: 'path', width: 80,
        },
        {
            title: 'Vue组件',
            dataIndex: 'component', width: 100,
        },
        {
            title: '权限',
            dataIndex: 'permission', width: 80,
        },
        {
            title: '排序',
            dataIndex: 'order', width: 80,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime', width: 150,
        },
        {
            title: '修改时间',
            dataIndex: 'createTime', width: 150,
        },
        {
            title: '操作', width: 80,
            render: (row) => '',
            fixed: 'right',
        },

    ];
    // 点击顶部删除
    // 删除选中
    const [deleArr, setDeleArr] = useState<number[]>([])
    const deleteMenu =async () => {
        console.log('删除id数组', deleArr);
        const res=await deleMenu(deleArr)
        if(res.status==200){
            message.success('删除成功')
            getMenu()
        }
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
        const newobj: IMenu = { ...menuReq }
        const rangeValue1 = values['createTime'];
        const menuName = values['menuName'];
        if (rangeValue1) {
            const startTime = rangeValue1[0].format('YYYY-MM-DD HH:mm:ss')
            const enTime = rangeValue1[1].format('YYYY-MM-DD HH:mm:ss')
            newobj.createTimeFrom = startTime
            newobj.createTimeTo = enTime
        } else {
            newobj.createTimeFrom = ''
            newobj.createTimeTo = ''
        }
        if (menuName) {
            newobj.menuName = menuName
        } else { newobj.menuName = '' }
        setMenuReq(newobj)
    };
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setMenuReq({
            menuName: '',
            createTimeFrom: '',
            createTimeTo: '',
        })
    };
    const rangeConfig = {
        rules: [{ type: 'array' as const }],
    };
    // 点击增加
    const [visible, setVisibleDrawer] = useState(false);
    const [visiblePopover, setVisiblePopover] = useState(false);
    const showDrawer = () => {
        setVisibleDrawer(true);
        dispatch({ type: 'menuModel/asyncGetMenu' })//获取菜单数据
    };
    // ---抽屉Drawer----
    const onClose = () => {

        setVisiblePopover(false);
        setVisibleDrawer(false);
    };
    // 添加角色表单
    const layoutAddForm = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const validateMessagesModal = {
        required: '${label} 未填写',
        types: {
            // email: '${label} 格式不正确!',
        },
    };
    // 添加的菜单权限
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const onCheckTree = (checkedKeysValue: any, e: any) => {
        console.log('onCheck', checkedKeysValue);
        // console.log('onCheck2', e);
        setCheckedKeys(checkedKeysValue);
    };
    // 确认添加
    const onFinishAddForm = async (values: any) => {
        const obj: any = values.menu
        if (!checkedKeys[0]) {
            obj.parentId = ''
        } else {
            obj.parentId = checkedKeys[0]
        }
        obj.type='0'
        console.log('添加对象', obj);
        const res = await addMenu(obj)
        if (res.status == 200) {
            message.success('添加成功')
            getMenu()
            onClose()
        } else { message.error('添加失败') }

    };
    // 取消添加确认气泡
    const handleVisibleChange = (newVisible: boolean) => {
        setVisiblePopover(newVisible);
    };
    // 
    const content = (
        <div>
            <Button onClick={() => { setVisiblePopover(false) }} size='small'>取消</Button>
            <Button type="primary" onClick={onClose} size='small' style={{ marginLeft: '10px' }}>确认</Button>
        </div>
    );
    return (
        <>
            <Form
                name="control-hooks"
                layout="inline"
                onFinish={onFinish}
                form={form}

            >
                <Form.Item name="menuName" label="名称">
                    <Input />
                </Form.Item>
                <Form.Item name="createTime" label="创建时间" {...rangeConfig}>
                    <RangePicker />
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
                <Button type="primary" onClick={showDrawer} size='small'>
                    新增
                </Button>
                <Button type="primary" onClick={deleteMenu} size='small' style={{ marginLeft: '10px' }}>
                    删除
                </Button>
                <Drawer
                    title="新增菜单"
                    placement='right'
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key='right'
                    destroyOnClose={true}
                    width={450}
                >
                    <Form {...layoutAddForm} name="nest-messages" onFinish={onFinishAddForm} validateMessages={validateMessagesModal}>
                        <Form.Item name={['menu', 'menuName']} label="菜单名称：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['menu', 'path']} label="菜单URL：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['menu', 'component']} label="组件地址：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['menu', 'perms']} label="相关权限：" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['menu', 'icon']} label="菜单图标：" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['menu', 'orderNum']} label="菜单排序：" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['menu', 'parentId']} label="上级菜单：" rules={[{ required: false }]}>
                            <Tree
                                checkable
                                onCheck={onCheckTree}
                                treeData={allMenu}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            {<Popover placement="top" visible={visiblePopover} onVisibleChange={handleVisibleChange} title='确定放弃编辑？' content={content} trigger="click">
                                <Button size='small'>取消</Button >
                            </Popover>}

                            <Button htmlType="submit" size='small' type="primary" style={{ marginLeft: '10px' }}>
                                提交
                            </Button>

                        </Form.Item>
                    </Form>
                </Drawer>

            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={allMenu} scroll={{ x: 1500, y: 300 }} />;
        </>
    )
};

export default Menu
