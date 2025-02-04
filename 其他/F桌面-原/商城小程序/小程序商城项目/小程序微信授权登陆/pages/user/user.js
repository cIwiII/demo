// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false
  },
  login(){
    // 推荐我们使用的api。这个api可以弹框让用户授权
    // 在以前微信版本里面 wx.getUserInfo()
    let _this = this;
    wx.getUserProfile({
      desc:"获取信息用户身份认证",
      success:(res1)=>{
        // 保存临时变量，后面登录成功后，需要将userInfo发送你们自己node服务器
        // 现在需要分清楚，需要微信服务器，还需要我们自己的后端服务器
        const userInfo = res1.userInfo
        // 沿着给当前微信用户是否能够进行授权登录
        wx.login({
          success:res2=>{
            wx.request({
              url: 'http://47.98.128.191:3001/users/wxLogin',
              data: {
                code:res2.code,
                appId:"wx36e047cbd8d6766d",
                appSecret:"c5afb12e7ab702332a04fa25c0658b84",
                userInfo:userInfo
              },
              method: 'POST',
              success: (result)=>{
                console.log(result);
                wx.setStorageSync("token", result.data.token);
                // 才会将头像和微信名字显示出来
                _this.setData({
                  userInfo,
                  hasUserInfo:true
                })
              },
              fail: ()=>{
                console.log("登录失败");
              },
            });
          },
          fail:error=>{
            console.log("当前用户身份无法进行登录");
          }
        })
      },
      fail:error=>{
        console.log(error);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})