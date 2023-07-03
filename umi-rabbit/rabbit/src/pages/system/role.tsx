
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from "umi"
import { IRole, IAddRole } from '@/types/requestParams'
import { deleteRole, addRole } from "@/apis/roleApi"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Drawer, Radio, Popover, Tree, message } from 'antd';
const Role = () => {
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch()
    const [roleReq, setRoleReq] = useState<IRole>({
        pageSize: '10',
        pageNum: '1',
        sortField: '',//排序的属性名（例如：roleName）
        sortOrder: '',// 	排序方式（例如：descend/ascend）
        createTimeFrom: '',// 	创建开始时间（例如：2021-10-01）
        createTimeTo: '', // 	创建结束时间（例如：2021-10-07）
        roleName: '',   //  用户名
    })
    const getRole = () => {
        dispatch({ type: 'roleModel/asyncGetRole', payload: roleReq })
    }
    useEffect(() => {//获取数单页显示数量，页数，查询改变发送请求
        getRole()
    }, [roleReq])
    type RootStateRole = { roleModel: { allRole: any[], roleTotal: number } }
    const { allRole, roleTotal } = useSelector((state: RootStateRole) => {
        return state.roleModel
    })
    type RootStateMenu = { menuModel: { allMenu: any[] } }
    const { allMenu } = useSelector((state: RootStateMenu) => {
        return state.menuModel
    })
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
            title: '角色',
            dataIndex: 'roleName',
        },
        {
            title: '描述',
            dataIndex: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '修改时间',
            dataIndex: 'modifyTime',
        },

        {
            title: '操作',
            render: (row) => ''
        },

    ];
    // 点击顶部删除
    // 删除选中
    const [deleArr, setDeleArr] = useState<number[]>([])
    const deleRole = async () => {
        if (deleArr.length == 0) { return }
        const res = await deleteRole(deleArr)
        if (res.status == 200) {
            message.success('删除成功')
            getRole()
            setCurrent(1)
            roleReq.pageNum='1'
            setRoleReq({...roleReq})
        } else {
            message.error('删除失败')
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
        const newobj: IRole = { ...roleReq }
        const rangeValue1 = values['createTime'];
        const roleName = values['roleName'];
        if (rangeValue1) {
            const startTime = rangeValue1[0].format('YYYY-MM-DD HH:mm:ss')
            const enTime = rangeValue1[1].format('YYYY-MM-DD HH:mm:ss')
            newobj.createTimeFrom = startTime
            newobj.createTimeTo = enTime
        } else {
            newobj.createTimeFrom = ''
            newobj.createTimeTo = ''
        }
        if (roleName) {
            newobj.roleName = roleName
        } else { newobj.roleName = '' }
        setRoleReq(newobj)
    };
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setRoleReq({
            pageSize: '10',
            pageNum: '1',
            sortField: '',
            sortOrder: '',
            createTimeFrom: '',
            createTimeTo: '', 
            roleName: '',  
        })
    };
    const rangeConfig = {
        rules: [{ type: 'array' as const }],
    };
    // 分页切换
    // 页数变化
    const [current, setCurrent] = useState(1)
    const changePageNum = (pageNum: number, pageSize: number) => {
        const newobj: IRole = { ...roleReq }
        if (newobj.pageSize !== pageSize.toString()) {
            newobj.pageSize = pageSize.toString()
            newobj.pageNum = '1'
            setCurrent(1)
        } else {
            newobj.pageNum = pageNum.toString()
            setCurrent(pageNum)
        }
        setRoleReq(newobj)
    }
    // 点击增加
    const [visible, setVisibleDrawer] = useState(false);
    const [visiblePopover, setVisiblePopover] = useState(false);
    const showDrawer = () => {
        setVisibleDrawer(true);
        dispatch({ type: 'menuModel/asyncGetMenu' })//获取最新菜单数据
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
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const onCheckTree = (checkedKeysValue: any, e: any) => {
        console.log('onCheck', checkedKeysValue);
        // console.log('onCheck2', e);
        setCheckedKeys(checkedKeysValue);
    };
    // 确认添加
    const onFinishAddForm = async (values: any) => {
        values.menuId = checkedKeys
        console.log('添加对象', values);
        const res = await addRole(values)
        if (res.status == 200) {
            message.success('添加成功')
            onClose()
            getRole()
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
                <Form.Item name="roleName" label="角色">
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
                <Button type="primary" onClick={deleRole} size='small' style={{ marginLeft: '10px' }}>
                    删除
                </Button>
                <Drawer
                    title="新增角色"
                    placement='right'
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key='right'
                    destroyOnClose={true}
                    width={450}
                >
                    <Form {...layoutAddForm} name="nest-messages" onFinish={onFinishAddForm} validateMessages={validateMessagesModal}>
                        <Form.Item name='roleName' label="角色名称：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='remark' label="角色描述：" rules={[{ required: true }]}>
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item name='menuId' label="权限选择：" rules={[{ required: false }]}>
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
            <Table rowSelection={rowSelection} pagination={{
                total: roleTotal, onChange: changePageNum, current: current,
            }} columns={columns} dataSource={allRole} locale={locales} rowKey='roleId' />
        </>

    )
};


export default Role
