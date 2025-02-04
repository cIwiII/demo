import React from 'react'

function index() {
 const clicks=()=>{
  console.log(process.env,11)
  console.log(process.env.BROWSER)
 }
  return (
    <div onClick={clicks} >环境变量输出测试</div>
  )
}

export default index