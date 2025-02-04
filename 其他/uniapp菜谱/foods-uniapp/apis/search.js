import fecthData from "./http"

//菜品搜索,obj={pageSize:12,currentPage:1,val:''}
const searchMenu=(obj)=>{
	return fecthData('search/searchMenu','POST',obj)
}
//菜单详情，obj={_id:''},餐品id
const menuDetail=(id)=>{
	return fecthData('search/menuDetail','POST',{_id:id})
}
//精品名厨视频
const memberRecommend=()=>{
	return fecthData('search/memberRecommend')
}
//页面随机推荐
// const memberRecommend=()=>{
// 	return fecthData('search/memberRecommend')
// }
export default {
	searchMenu,menuDetail,memberRecommend
}