import React, { Component } from 'react'
// connect是一个高阶
import { connect } from "react-redux"
import {incrementAC} from "../redux/actions/index"

class ReduxClassComp extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    add = ()=>{
        this.props.dispatch(incrementAC(20))
    }
    render() {
        return (
            <div>
                <p>{this.props.mycount}</p>
                <button onClick={this.add}>+</button>
            </div>            
        )
    }
}

// 将仓库数据挂到this.props上。connect是柯里化函数，第一次传入仓库数据，第二个传入当前组件，
// connect后的组件会有dispatch属性。
//参数一：state，参数二：组件通过props传入参数。
const mapStateToProps = (state) => {
    console.log("state",state);
    return {
        mycount: state.CountRD.count
    }
}
export default connect(mapStateToProps)(ReduxClassComp)
