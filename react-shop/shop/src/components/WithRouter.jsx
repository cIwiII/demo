/**
 * 账户操作，高阶组件写法
 * 非路由组件，直接import导入到页面中组件。props身上并没有history、location对象,需要使用 withRouter 高阶组件
 */

import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class SelectComp extends Component {
    signUp = (event) => {
        const ok = confirm('确认注销吗');//eslint-disable-line
        if(ok){
            console.log(this.props);
            localStorage.removeItem('token');
            this.props.history.replace("/login")
        }
    }
    render() {
        return (
            <ul>
                <li onClick={this.signUp} >注销</li>
                <li >修改密码</li>
            </ul>
        )
    }
}
export default withRouter(SelectComp)