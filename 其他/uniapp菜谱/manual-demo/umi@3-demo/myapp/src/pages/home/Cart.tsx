import React, { Component } from 'react'
interface IProduct {
    id:number,
    name:string
}
interface IState {
    list:IProduct[]
}
interface IProps {

}
export default class Cart extends Component {
    // state数据已经被约束了
    state:IState={
        list:[
            {id:1,name:"小米"}
        ]
    }
    render() {
        return (
            <div>Cart</div>
        )
    }
}
