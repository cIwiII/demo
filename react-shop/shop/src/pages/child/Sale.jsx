import React,{useRef} from 'react'
import {useHistory} from "react-router-dom"
import {useGetStorage,useSetStorage} from "../../hooks/MyHook"


export default function Sale() {
  const pwdRef = useRef()
  const history = useHistory()
  const callback = useSetStorage()
  const array = useGetStorage()
  
  const getValue = () => {
    // console.log(Sale.inputElement.value);
    // // 默认获取到一个对象，这个对象里面会出现current的属性
    // console.log(pwdRef.current);
    history.push({
      pathname:"/home/shop",
      query:{
        id:1
      }
    })
  }
  
  const addData = ()=>{
    callback(123)
  }
  const getData = ()=>{
    console.log(array);
  }
  return (
    <div>
      <h3>自定义hook</h3>
      <input ref={params => Sale.inputElement = params} type="text" />
      <input ref={pwdRef} type="password" />
      <button onClick={getValue}>获取文本框值</button>
      <button onClick={addData}>添加数据</button>
      <button onClick={getData}>获取数据</button>
    </div>
  )
}
