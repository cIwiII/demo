import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, history } from "umi"
import { IUser } from '@/types/requestParams'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Col, Row, Modal, Tooltip, Form, Input, Select, DatePicker, Drawer, Radio, Popover } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { addUser, putUser, deleUsers } from "@/apis/userApi"


const { Option } = Select;
const { RangePicker } = DatePicker;
// 自定义图标
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_3620139_zfusdlhy3o.js'
    ],
});
export default function CheckTable() {
    const dispatch = useDispatch()
    type RootState = { userModel: { allUser: any[], userTotal: number, dept: any[], allRole: any[] } }
    const { allUser, userTotal, dept, allRole } = useSelector((state: RootState) => {
        return state.userModel
    })
    // 修改对象
    const [putObj, setPutObj] = useState<any>({})
    // 模态是修改还是新增
    const [showAP, setShowAP] = useState('P')
    // 查看对象
    const [lookObj, setLookObj] = useState<any>({})
    // 查询对象
    const [userReq, setUserReq] = useState<IUser>({
        pageSize: '10',
        pageNum: '1',
        sortField: '',//排序的属性名（例如：username）
        sortOrder: '',// 	排序方式（例如：descend/ascend）
        createTimeFrom: '',// 	创建开始时间（例如：2021-10-01）
        createTimeTo: '', // 	创建结束时间（例如：2021-10-07）
        username: '',   //  用户名
        deptId: ''  // 部门 ID
    })
    const getUser = () => {// 获取数据
        dispatch({ type: 'userModel/getUser', payload: userReq })
    }
    useEffect(() => {
        dispatch({ type: 'userModel/asyncGetDept' })
    }, [])
    useEffect(() => {
        getUser()
    }, [userReq])

    // 删除的数组
    const [deleArr, setDeleArr] = useState<number[]>([])
    interface DataType {
        // key: React.Key;
        // name: string;
        // age: number;
        // address: string;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '性别',
            dataIndex: 'ssex',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '部门',
            dataIndex: 'deptName',
        },
        {
            title: '电话',
            dataIndex: 'mobile',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '操作',
            render: (row) => (
                <>
                    <Tooltip placement="bottomLeft" color='#2db7f5' title='修改用户'>
                        <Button type="link" size='small' onClick={() => showDrawer('P', row)}><IconFont type='icon-shezhi' /></Button>
                    </Tooltip>
                    <Tooltip placement="bottomLeft" color='#2db7f5' title='查看'>
                        <Button type="link" size='small' onClick={() => modalShow(row)}><IconFont type='icon-yanjing-' /></Button>
                    </Tooltip>
                </>
            )
        },

    ];
    // 表格选中
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        let newarr: number[] = []
        newSelectedRowKeys.forEach(v => {
            newarr.push(Number(v))
        })
        console.log('selectedRowKeys changed: ', newarr);
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
    // 页数变化
    const [current, setCurrent] = useState(1)
    const changePageNum = (pageNum: number, pageSize: number) => {
        const newobj: IUser = { ...userReq }
        if (newobj.pageSize !== pageSize.toString()) {
            newobj.pageSize = pageSize.toString()
            newobj.pageNum = '1'
            setCurrent(1)
        } else {
            newobj.pageNum = pageNum.toString()
            setCurrent(pageNum)
        }
        setUserReq(newobj)
    }
    //点击查询
    const onFinish = (values: any) => {
        const newobj: IUser = { ...userReq }
        const rangeValue1 = values['createTime'];
        const username = values['username'];
        const deptId = values['deptId'];
        if (rangeValue1) {
            const startTime = rangeValue1[0].format('YYYY-MM-DD HH:mm:ss')
            const enTime = rangeValue1[1].format('YYYY-MM-DD HH:mm:ss')
            newobj.createTimeFrom = startTime
            newobj.createTimeTo = enTime
        } else {
            newobj.createTimeFrom = ''
            newobj.createTimeTo = ''
        }
        if (username) {
            newobj.username = username
        } else { newobj.username = '' }
        if (deptId) {
            newobj.deptId = deptId
        } else { newobj.deptId = '' }
        setUserReq(newobj)
    };
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setUserReq({
            pageSize: '10',
            pageNum: '1',
            sortField: '',
            sortOrder: '',
            createTimeFrom: '',
            createTimeTo: '', 
            username: '',
            deptId: '' 
        })
    };
    const rangeConfig = {
        rules: [{ type: 'array' as const }],
    };

    // ---新增或修改的抽屉----
    const [visible, setVisibleDrawer] = useState(false);
    const showDrawer = (ap: string, obj?: any) => {
        setShowAP(ap)
        setPutObj(obj)
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
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onClose}>确认</Button>
        </div>
    );

    // 抽屉内表单，添加提交
    const onFinishAddForm = async (values: any) => {
        if (!(values.email)) {
            values.email = ''
        }
        if (showAP == "P") {//修改
            values.userId = putObj.userId
            const res = await putUser(values)
            if (res.status == 200) {
                message.success('修改成功')
                onClose()
                getUser()
            }
        } else {//添加执行
            console.log('add参数',values)
            const res = await addUser(values)
            if (res.status == 200) {
                message.success('添加成功')
                onClose()
                getUser()
            }
        }

    };
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
    // 删除选中// 删除数据
    const deleUSers = async () => {
        const lastRes = window.confirm('是否确认删除所选数据，删除后不可恢复，谨慎操作?')
        if (!lastRes) { return }
        const res = await deleUsers(deleArr)
        if (res.status == 200) {
            message.success('删除成功')
            getUser()
        }
    }
    // 打开模态框查看
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const modalShow = (obj: any) => {
        setLookObj(obj)
        setIsModalVisible(true)
    }
    return (
        <>
            <Form
                name="control-hooks"
                layout="inline"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item name="username" label="用户名">
                    <Input />
                </Form.Item>
                <Form.Item name="deptId" label="部门">
                    <Select
                        placeholder=""
                        allowClear
                        style={{ width: '200px' }}
                    >
                        {
                            dept.map(v => {
                                return <Option value={v.id} key={v.title}>{v.title}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="createTime" label="创建时间" {...rangeConfig}>
                    <RangePicker />
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
                <Button type="primary" onClick={() => showDrawer('A')} size='small'>
                    新增
                </Button>
                <Button type="primary" onClick={deleUSers} size='small' style={{ marginLeft: '10px' }}>
                    删除
                </Button>
                <Drawer
                    title={showAP == 'P' ? "修改用户" : "新增用户"}
                    placement='right'
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key='right'
                    destroyOnClose={true}
                    width={500}
                >
                    <Form {...layoutModal} initialValues={putObj} name="nest-messages" onFinish={onFinishAddForm} validateMessages={validateMessagesModal}>
                        <Form.Item name='username' label="用户名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        {
                            showAP == 'P' ? '' : <Form.Item name='password' label="密码" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        }
                        <Form.Item name='email' label="邮箱" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        {
                            showAP == 'P' ? '' : <Form.Item name='mobile' label="手机" rules={[{ required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' }]}>
                                <Input />
                            </Form.Item>
                        }
                        <Form.Item name='roleId' label="角色" rules={[{ required: true }]}>

                            <Select
                                placeholder=""
                                allowClear
                                style={{ width: '100%' }}
                            >
                                {
                                    allRole.map((v, index) => <Option value={`${v.roleId}`} key={index}>{v.roleName}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name='deptId' label="部门" rules={[{ required: true }]}>
                            <Select
                                placeholder=""
                                allowClear
                                style={{ width: '100%' }}
                            >
                                {
                                    dept.map(v => <Option value={v.id} key={v.title}>{v.title}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name='status' label="状态" rules={[{ required: true }]}>

                            <Radio.Group>
                                <Radio value="0">锁定</Radio>
                                <Radio value="1">有效</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name='ssex' label="性别" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="0">男</Radio>
                                <Radio value="1">女</Radio>
                                <Radio value="2">保密</Radio>
                            </Radio.Group>
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
            <Table rowSelection={rowSelection} columns={columns} dataSource={allUser} rowKey='userId' pagination={{
                total: userTotal,
                onChange: changePageNum, current: current
            }} />
            <Modal visible={isModalVisible} width={700} footer={null} style={{ padding: '0 20px' }} onCancel={handleCancel}>
                <div style={{ marginBottom: '20px' }}>用户信息</div>
                <Row>
                    <Col span={5}>
                        <img src={`http://xawn.f3322.net:8002/distremote/static/avatar/${lookObj.avatar}`} alt="" style={{ width: '90px', height: '90px' }} />
                    </Col>
                    <Col span={19}>
                        <Row>
                            <Col span={12}>账户：{lookObj.username}</Col>
                            <Col span={12}>部门：{lookObj.deptName}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>角色：{lookObj.roleName}</Col>
                            <Col span={12}>状态：{lookObj.status == '1' ? '有效' : '无效'}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>性别：{lookObj.ssex == '0' ? '男' : (lookObj.ssex == '1' ? '女' : '保密')}</Col>
                            <Col span={12}>创建时间：{lookObj.createTime}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>电话：{lookObj.mobile}</Col>
                            <Col span={12}>最近登录：{lookObj.lastLoginTime}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>邮箱：{lookObj.email}</Col>
                            <Col span={12}>描述：{lookObj.description}</Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )
};
