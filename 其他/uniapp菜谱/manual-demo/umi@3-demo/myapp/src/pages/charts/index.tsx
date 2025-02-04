import React from 'react'
import request from "umi-request"
import axios from 'axios'
import {useDispatch,useSelector} from "umi"

export default function Index() {
  useEffect(() => {
    console.log(props);
  }, [])
  // 加上类型约束
  type RootState = {userModel:{count:number,users:[]}}
  const {count,users} = useSelector((state:RootState)=>{
    console.log(new Date().getMilliseconds(),state.userModel);
    return state.userModel
  })
 const dispatch =  useDispatch()
  const fetchData = () => {
    request.get("http://127.0.0.1:8002/users/getAccountList2")
    .then(res=>{
      console.log(res); 
    })
    .catch(error=>{
      console.log(error);
      
    })
  }

  const axiosGetData = ()=>{
    axios.get("http://127.0.0.1:8002/users/getAccountList2").then(res=>{
      console.log(res);
    })
  }

  const changeCount = ()=>{
    // 派发action到reducer的时候,必须指定命名空间名字
    dispatch({type:"userModel/initState",payload:100})
  }
  const asycnData = ()=>{
    dispatch({type:"userModel/getAllUserSaga",payload:"123"})
  }
  return (
    <div>
      <h3>图表统计</h3>
      <button onClick={fetchData}>内置请求发送</button>
      <button onClick={axiosGetData}>axios请求</button>
      <h3>状态机数据</h3>
      <p>{count}</p>
      <button onClick={changeCount}>修改</button>
      <p>{users.length}</p>
      <button onClick={asycnData}>异步请求</button>
    </div>
  )
}
