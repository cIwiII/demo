import {combineReducers} from "redux"
import UserReducer from "./UserReducer"
import ExReducer from "./example"

/**
 * 将多个reducer合并在一起
 */
export default combineReducers({
    UserRD:UserReducer,
    CountRD:ExReducer,
})