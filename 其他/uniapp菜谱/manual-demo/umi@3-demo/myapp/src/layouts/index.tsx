import React from 'react'

export default function index(props:any) {
  return (
    <div>
        <div>这是我们的App.js</div>
        {/* 路由渲染出口 */}
        {props.children}
    </div>
  )
}
