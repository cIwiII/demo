import fecthData from "./http"
//微信授权登录obj必须={code:'',appId:'',appSecret:''}
const wxLogin=(obj)=>{
	return fecthData('user/wxLogin','POST',obj)
}
//授权后更新数据库信息obj={token:'',avatarUrl:'',nickName:'',gender:'',province:''}
const auth=(obj,token)=>{
	return fecthData('user/auth','POST',obj,token)
}
//获取用户信息
const getUserInfo=(token)=>{
	return fecthData('user/getUserInfo','GET',{token})
}
export default {
	wxLogin,auth,getUserInfo
}