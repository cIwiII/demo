import { Button, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { findGoodsByName } from '../api/goodsMsApi'

const { Option } = Select;

export default function Search(props) {
    // console.log(props.putdata)
    const [searchType, setSearchType] = useState('name')
    const [searchData, setSearchData] = useState('')
    //改变条件
    const changeSerachType=(val)=>{
        setSearchType(val)
    }
    useEffect(()=>{
        const data={searchType,searchData:'' }
        setSearchData('')
        findAllGoods(data)
    },[searchType])
    //发送请求
   const findAllGoods=async (data)=>{
        const res=await  findGoodsByName(data)
        if(res.code===1){
          props.putdata(res.data)
        }
    }
    const onFinish =(values) => {
        // console.log('Received values from form: ', values);
        const data={searchType,searchData, }
        findAllGoods(data)
    };
    return (
        
        <Form
            name="customized_form_controls"
            layout="inline"
            onFinish={onFinish}
        >
            <Form.Item
                name="data"
            >
                <span>
                    <Select
                    defaultValue={searchType}
                    
                        style={{
                            width: 150,
                            margin: '0 8px',
                        }}
                        onChange={changeSerachType}
                    >
                        <Option value="name">按名字搜索</Option>
                        <Option value="title">按描述搜索</Option>
                    </Select>
                    <Input
                        type="text"
                        style={{
                            width: 200,
                        }}
                        value={searchData}
                        onChange={(event) => { setSearchData(event.target.value) }}
                    />

                </span>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
