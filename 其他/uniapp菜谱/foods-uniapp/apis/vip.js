import fecthData from "./http"

//分类信息
const getRecommendMenuList=()=>{
	return fecthData('vip/getRecommendMenuList')
}
//限免
const getisFreeMenuList=()=>{
	return fecthData('vip/getisFreeMenuList')
}
//猜你喜欢
const likeMenu=()=>{
	return fecthData('vip/likeMenu')
}
//精品名称（会员专享）
const vipExclusive=()=>{
	return fecthData('vip/vipExclusive')
}

export default {
	getRecommendMenuList,getisFreeMenuList,likeMenu,vipExclusive
}