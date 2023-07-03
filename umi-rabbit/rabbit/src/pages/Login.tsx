import React, { ReactNode,useState, useEffect  } from 'react'
import { Button, Checkbox, Form, Input,Radio, message } from 'antd';
import { login } from "@/apis/userApi"
import { useDispatch, useSelector, history } from "umi"
import inStyle from './index.less'
import logo from "@/assets/logo.png"
import UploadImg from "@/components/UploadImg"
// 手机验证请求
import {checkTel,checkShopName,addCharge} from "@/apis/genApi"

import {IShopEnter} from "@/types/requestParams"
interface IProps {
  images?: string;
  name?: string;
  alt?: string;
  children?: ReactNode;
}

const Login: React.FC<IProps> = (props) => {
  const dispatch = useDispatch()
  const [show,setShow]=useState(true)
  const { images, name, alt } = props
  // 登录
  const onFinish = async (values: any) => {
    const { username, password } = values
    const res = await login(username, password)
    // debugger
    if (!res) { alert('登录异常'); return }
    if ((res as any).message == "认证成功") {
      message.success('登录成功')
      dispatch({ type: "userModel/getUserInfo", payload: res.data })
      history.replace('/home')
    } else {
      message.error('登录失败')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 入驻
  // 身份证照片地址接收
  const [idCardImgArr,setIdCardImgArr]=useState<string[]>([])
  // 接收营业照片地址数组
  const [licenceImgArr,setLicenceImgArr]=useState<string[]>([])
  useEffect(()=>{},[])
  const onFinishAddShop = async (values:IShopEnter) => {
    const obj=values
    console.log('原数据',obj);
    const res:any=await checkTel(obj.tel)
    if(!res.boo){
      alert('手机号已注册,请直接登陆')
      return 
    }
    
    const res2:any=await checkShopName(obj.shopName)
    if(!res2.boo){
      alert('店铺名已注册,请更换名字')
      return 
    }
    // console.log('店铺名验证返回',res2)
    obj.idCardImg=idCardImgArr[0]
    obj.licenceImg=licenceImgArr[0]
    console.log('入驻信息',obj)
    const resAdd:any=await addCharge(obj)
    if(resAdd && resAdd.result){
      message.success('入驻成功，请登录')
      setShow(true)
    }else{
      message.error('入驻失败，请稍后尝试')
    }
  };
  
  return (
    
    <div id={inStyle.login}>
      
      <div className={inStyle.log}>
      <div className={inStyle.logo}><img src={logo} alt="" /><div>赤兔养车</div></div>
      {
        show?<>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '用户名格式不正确' }]}
          >
            <Input placeholder="Username"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码格式不正确' }]}
            style={{marginBottom:'0'}}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item valuePropName="checked" wrapperCol={{span: 16 }} style={{marginBottom:'0'}}>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{span: 24 }}>
            <Button type="primary" htmlType="submit" style={{width:'100%'}}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={inStyle.foot}>
        <Button type="link">账号注册</Button>
        <Button type="link" onClick={()=>{setShow(false)}}>商家入驻</Button>
        </div>
        </>
        :
        <Form
        name="apply"
        labelCol={{ span:8}}
        wrapperCol={{ span: 24}}
        onFinish={onFinishAddShop}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelWrap={true}
      >
        <Form.Item
          label="商铺类型"
          name="type"
          rules={[{ required: true}]}
          
        >
          <Radio.Group>
            <Radio value="0">充电站</Radio>
            <Radio value="1">其他</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="店铺名"
          name="shopName"
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="tel"
          rules={[{ required: true, message: '手机号格式不正确',pattern:/^1[3-9]\d{9}$/}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="店铺地址"
          name="address"
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="注册人"
          name="managerName"
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="身份证号"
          name="idCard"
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="身份照片"
          name="idCardImg"
          initialValue='用户未上传选择'
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <UploadImg resImgPath={setIdCardImgArr}></UploadImg>
        </Form.Item>

        <Form.Item
          label="营业执照编号"
          name="licenceNo"
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="营业执照照片"
          name="licenceImg"
          initialValue='用户未上传选择'
          rules={[{ required: true, message: '格式不正确' }]}
        >
          <UploadImg resImgPath={setLicenceImgArr}></UploadImg>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            立即申请
          </Button>
          <Button type="link" onClick={()=>{setShow(true)}}>使用已有账号</Button>

        </Form.Item>
      </Form>
    }
      </div>
    </div>
  )
}
export default Login

