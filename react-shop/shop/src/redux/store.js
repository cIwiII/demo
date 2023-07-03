
 import { applyMiddleware, legacy_createStore} from "redux"
 import reducer from "./reducers"
 import logger from 'redux-logger'  //日志记录。控制台输出。
 import thunk from 'redux-thunk'  //thunk'让dispatch可以执行异步请求。
 import {composeWithDevTools} from 'redux-devtools-extension'
 
 const store = legacy_createStore(reducer,composeWithDevTools(applyMiddleware(logger,thunk)))
 
export default store

