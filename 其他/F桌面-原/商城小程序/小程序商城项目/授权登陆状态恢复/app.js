// 应用生命周期，用户访问小程序的时候，一进来就执行onLaunch
App({
  onLaunch() {
    // 验证身份，判断token是否过期，如果token没过期，从服务器获取用户的userInfo
    const token = wx.getStorageSync("token");
    wx.request({
      url: 'http://47.98.128.191:3001/users/getUserInfo',
      // 这个请求头是后端要求我们必须写的名字
      header: {'Authorization':token},
      method: 'GET',
      success: (result)=>{
        console.log(result);
        if(result.data.code){
          // 将userInfo保存起来
          const userInfo = result.data.userInfo
          // 在进入程序的时候，马上获取userInfo，保存全局对象
          this.globalData.userInfo = userInfo
        }
      },
      fail: (error)=>{
        console.log(error);
      }
    });
    
  },
  // 原生小程序有没有状态机，但是提供globalData
  globalData: {
    userInfo: null
  }
})
