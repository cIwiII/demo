import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {Button, Form,  InputNumber,Card, Input, message,Cascader
} from 'antd';
import { addGoods } from '../../api/goodsMsApi'
import { findAllCategroy } from '../../api/goodsCateApi'
import FileUpload from '../../components/FileUpload';
export default function AddShop(props) {
    const [data,setData]=useState([])
    const [typeId,setTypeId] = useState(null)
    const [fileName,setFileName] = useState(null)//存上传后图片名字
    
    // 表单宽度设置
    const formItemLayout = {
        labelCol: {
            span: 6,
            offset: 3,
        },
        wrapperCol: {
            span: 8,
        },
    };
    //图片上传
    const getFileName = (fileName)=>{
        console.log(fileName);
        setFileName(fileName)
    }
    //进入页面获取所有一级分类——id
    useEffect(()=>{
        getAllCate();
    },[])
    const getAllCate=async ()=>{
      const res=await findAllCategroy()
      console.log(res)
      setData(res.data)
    }
    const getCetegoryId = (value,value2)=>{
        setTypeId(value2[1].id)
        
    }
    //获取添加信息对象
    const onFinish =async (obj) => {
        console.log('Received values of form: ', obj);
        obj.imgSrc=fileName
        obj.type=typeId
        const res=await addGoods(obj)
        console.log(obj);
        // debugger
        if(res.code===1){
            message.success(res.msg)
            props.history.replace('/home/product/list');
        }
    };
    return (
        <div>
            <Card
                title="添加商品"
                extra={<Link to='/home/product/list'>返回</Link>}
            >
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        'price': 999,
                    }}
                >
                    <Form.Item name="name" label="商品名字"
                        rules={[ {required: true,} ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="商品的描述"
                        rules={[ {required: true, message: '请简要描述', }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                   

                    <Form.Item label="商品的价格">
                        <Form.Item name="price" noStyle>
                            <InputNumber min={1} max={999999999} />
                        </Form.Item>
                        <span className="ant-form-text"> 请填写价格</span>
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="商品的分类"
                        hasFeedback
                        rules={[ {required: true, message: '请选择分类!' },
                        ]}
                    >
                        <Cascader options={data} onChange={getCetegoryId} placeholder="请选择商品类别" />
                    </Form.Item>
                    <Form.Item
                        name="imgSrc"
                        label="上传图片"
                    >
                       <FileUpload getFileName={getFileName} ></FileUpload>
                    </Form.Item>
                    <Form.Item name="msg" label="商品的详情"
                        rules={[ {required: true,message: '描述商品详情', }, ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 12, }} >
                        <Button type="primary" htmlType="submit">
                            确认添加
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    )
}
