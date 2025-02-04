// pages/user/user.js
// getApp这个函数无需引入，直接调用
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false
  },
  async userProfile() {
    const userInfoPromise = new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: "获取信息用户身份认证",
        success(res1) {
          resolve(res1.userInfo)
        }
      })
    })
    const loginPromise = new Promise((resolve, reject) => {
      wx.login({
        success: (result) => {
          resolve(result.code)
        }
      });
    })
    const userInfo = await userInfoPromise
    console.log(userInfo);
    const code = await loginPromise
    console.log(code);

    new Promise((resolve, reject) => {
      wx.request({
        url: 'http://47.98.128.191:3001/users/wxLogin',
        data: {
          code: code,
          appId:'wx8af0d772136f1e01',
          appSecret:"5f646a6c12de7c01a343b566bc2f75e1",
          userInfo: userInfo
        },
        method: 'POST',
        success: (result) => {
          console.log(result);
          wx.setStorageSync("token", result.data.token);
          
        },
        fail: () => {
          console.log("登录失败");
        },
      });
    })

    
  },
  // login2(){
  //    const userInfoPromise=new Promise((resolve,reject)=>{
  //     wx.getUserProfile({
  //       desc:'用户身份获取',
  //       success(res1){
  //         resolve(res1.userInfo)
  //       }
  //     })
  //    })
  //    const loginPromise=new Promise((resolve,reject)=>{
  //     wx.getUserProfile({
  //       desc:'用户身份获取',
  //       success(res1){
  //         resolve(res1.userInfo)
  //       }
  //     })
  //    })
  // },
  login(){
    let _this=this
    wx.getUserProfile({
      desc:'获取用户信息，身份认证',
      success:(res1)=>{
        //临时保存信息
        const userInfo=res1.userInfo
        //验证用户是否授权
        wx.login({
          success:res2=>{
            console.log('用户授权返回',res2);
            wx.request({
              url:'http://47.98.128.191:3001/users/wxLogin',
              data:{
                //每次登陆生成的code都是不一样的，类似于token
                code:res2.code,
                //开发管理用自己appId和appSecret
                appId:'wx8af0d772136f1e01',
                appSecret:"5f646a6c12de7c01a343b566bc2f75e1",
                userInfo:userInfo
              },
              method:'POST',
              success:(result)=>{
                console.log('存储',result);
                wx.setStorageSync('token', result.data.token);
                //显示名字和头像
                _this.setData({
                  userInfo,
                  hasUserInfo:true
                })
              },
              fail:()=>{
                console.log('登陆失败');
              }

            });
          },
          fail:(error)=>{
            console.log("当前用户身份无法进行登录");
          }
        })
      },
      fail:error=>{
        console.log(error)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {userInfo} = app.globalData
    if(userInfo){
      this.setData({
        userInfo,
        // 身份已经存在
        hasUserInfo:true
      })
    }
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