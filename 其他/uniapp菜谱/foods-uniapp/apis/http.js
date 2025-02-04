
//所有请求公共地址
const BASEURL = "http://localhost:4001/"
export default function fetchData(url,method="GET",data={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASEURL+url,
			method,
			data,
			headers:{
				Authorization:uni.getStorageSync("token")
			},
			success(res){
				resolve(res)
			},
			fail(error){
				reject(error)
			}
		})
	})
}