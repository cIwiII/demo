import React from 'react'
import { Link, NavLink } from "umi"
import { useHistory } from "umi"

export default function Product(props: any) {
  const history = useHistory()
  const gotoPage = () => {
    // props.history.push("/home/user")
    // history.push("/home/user?id=1")
    // history.push({
    //   pathname: "/home/user",
    //   state: {
    //     id: 1
    //   }
    // })
    props.history.push({
      pathname:"/home/user",
      query:{id:1}
    })

  }
  return (
    <>
      <div>Product</div>
      <div>
        <Link to="/home/user">用户界面</Link>
        <button onClick={gotoPage}>跳转</button>
        <input type="text"/>
      </div>
    </>
  )
}
