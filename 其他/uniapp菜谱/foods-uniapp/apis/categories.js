import fecthData from "./http"

//分类信息
const categories=()=>{
	return fecthData('categories')
}
export default {
	categories
}