/**
 * example
 * @param {*} num
 * @returns
 */
export const incrementAC = num => {
    return {
      type: "INCREMENT",
      payload: num
    };
  };
  
  export const decrementAC = num => {
    return {
      type: "DECREMENT",
      payload: num
    };
  };
  export const changeUsernameAC = name => {
    return {
      type: "UPDATENAME",
      payload: name
    };
  };
  
  
  // action用于通知reducer进行数据更新
  // type属性是必须写的。值由用户自己来定
  // payload名字是我们自己取的。值就是你要修改的内容
  
  //默认不能执行请求，安装redux-thunk后可以发送异步,以下代码就是一个中间件
  // 这个actionCreator可以支持异步请求
  // export const asyncdecrementAC=()=>{
  //     return async (dispatch)=>{
  //         const res=await apimethd()
  //         dispatch(decrementAC(res.data))
  //     }
  // }
  