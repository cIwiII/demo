/**
 * 全局异常组件，避免直接将错误抛给用户
 * 通过 props.children 渲染组件，外层全局包裹
 */
import React, { Component } from 'react'
// import Children from './Children'

export default class ErrorComp extends Component {
    constructor() {
        super()
        this.state = {
            hasError:false
        }
    }
    componentDidMount(){
        console.log("123");
    }
    //有异常时执行
    componentDidCatch(error,info){
        console.log(error);
        console.log(info);
        try {
            this.setState({
                hasError:true
            })
        } catch (error) {
            // 处理异常
        }
        
    }
    render() {
        if(this.state.hasError){
            return <h1>page Error，doSomething</h1>
        }else{
            // this.props.children;代表你们要渲染的页面
            // 插槽this.props.children; 代表Children组件
            // 利用插槽，返回要渲染的页面
            return this.props.children;
        }
    }
}
