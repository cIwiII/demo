import fecthData from "../index";

// 获取商品
export const goodsRequest = (data)=>fecthData("/goods/search",data)

