import React, { Component } from 'react'
interface IProps {
    count:number,
    changeCount(val:number):void
}

interface IState {

}
// 第一个泛型用于约束props对象,第二个泛型state
export default class Footer extends Component<IProps,IState> {
  render() {
    const {count,changeCount} = this.props
    return (
      <div>
        <h3>Fooer</h3>
        <p>{count}</p>
        <button onClick={()=>changeCount(1200)}>修改count</button>
      </div>
    )
  }
}
