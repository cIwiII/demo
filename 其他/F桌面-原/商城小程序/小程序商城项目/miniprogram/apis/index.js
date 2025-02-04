// 封装我们的请求
const BASEURL = "http://127.0.0.1:4000";
const fecthData = (url,data={},method="GET")=>{
    return new Promise((resolve,reject)=>{
        var reqTask = wx.request({
            url: BASEURL + url,
            data: data,
            method: method,
            success: (result)=>{
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
        });
    })
}

export default fecthData