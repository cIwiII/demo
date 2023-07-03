import React from 'react'
import {useLocation} from "react-router-dom"

export default function Shop() {
  const location = useLocation()
  useEffect(()=>{
    console.log(location.query);
  },[location])
  return (
    <div>Shop</div>
  )
}
