import React from 'react'

export default function _layout(props:any) {
  return (
    <div>
        <div>这是_layout组件</div>
        {props.children}
    </div>
  )
}
