import React,{ReactNode} from 'react'
import {useHistory,withRouter} from "umi"

interface IProps {
    count:number,
    // ReactNode代表React节点类型
    user:{
        id:number,
        name:string
    },
    changeCount(val:number):void,
    children?:ReactNode,
    history:any
}
export default function Header(props:IProps) {
  const histroy = useHistory()
  const gotoPage = ()=>{
    // 传递参数不用query
    histroy.push({
      pathname:"/charts",
      state:{
        id:1
      }
    })
    // props.history.push({
    //   pathname:"/charts",
    //   query:{
    //     id:1
    //   }
    // })
  }
  return (
    <div>
        <h4>Header</h4>
        <p>{props.count}</p>
        <button onClick={()=>props.changeCount(1000)}>修改count</button>
        {/* <p>{props}</p> */}
        <button onClick={gotoPage}>跳转</button>
    </div>
  )
}

// export default withRouter(Header)
