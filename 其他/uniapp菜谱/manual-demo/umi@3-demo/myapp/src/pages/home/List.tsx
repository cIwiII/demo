import React,{useState} from 'react'
import {IUser,IProduct} from "../../types/user"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function List() {
  // 定义我们count数据的时候,默认的数据类型为number类型
  
  const [count,setCount] = useState<number>(10)
  const [user,setUser] = useState<IUser>({id:1,name:"xiaowang"})
  const [product,setProduct] = useState<IProduct[]>([
    {id:1,name:"小米"}
  ])

  const changeCount = (val:number)=>{
    setCount(val)
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={()=>setCount(100)}>修改</button>
      <Header count={count} user={user} changeCount={changeCount}></Header>
      <Footer count={count} changeCount={changeCount}></Footer>
    </div>
  )
}
