import axios from "../../../vuex搭建src/src/utils/axiosUtils"
import {IProduct} from "../../../vuex搭建src/src/types/ProductInterface"

export const findAllProduct = ()=>axios.get("/goods/findGoods")

export const addProductApi = (data:IProduct)=>axios.post("/goods/addGoods",data)

