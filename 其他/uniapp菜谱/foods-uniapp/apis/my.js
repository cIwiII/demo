import fecthData from "./http"
//套餐列表
const topupList=()=>{
	return fecthData('user/topupList')
}
//会员开通(续费)
const openVip=(id,date)=>{
	return fecthData('user/openVip','GET',{_id:id,date})
}
//用户全部收藏（用户_id）
const getcollect=(id)=>{
	return fecthData('user/getcollect/','GET',{_id:id})
}
//收藏餐品 obj={user_id:'',menu_id:''}
const collect=(obj)=>{
	return fecthData('user/collect','POST',obj)
}
//我的点赞  obj={user_id:'',menu_id:''}
const mylike=(obj)=>{
	return fecthData('user/mylike','POST',obj)
}
//所有点赞  obj={user_id:''}
const getmylike=(id)=>{
	return fecthData('user/getmylike','GET',{_id:id})
}
//浏览餐品 obj={user_id:'',menu_id:''}
const record=(obj)=>{
	return fecthData('user/record','POST',obj)
}
//我的浏览记录
const getrecord=(id)=>{
	return fecthData('user/getrecord','GET',{_id:id})
}
export default {
	topupList,openVip,getcollect,collect,mylike,getmylike,record,getrecord
}