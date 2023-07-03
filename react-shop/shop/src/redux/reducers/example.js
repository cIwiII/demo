//  创建一个reducer
// reducer本身是一个函数，而且是一个纯函数
// 纯函数：一个函数内部所有的执行不依赖外部数据，只能依赖他的参数。将这种函数称为纯函数

export default function reducer(state = { count: 1}, action) {
    let { count } = state
    switch (action.type) {
        // 这个case进行累加的过程
        case "INCREMENT":
            count += action.payload
            return {
                ...state, count
            }
        case "DECREMENT":
            count -= action.payload
            return {
                ...state,count
            }
        default:
            return state
    }
}