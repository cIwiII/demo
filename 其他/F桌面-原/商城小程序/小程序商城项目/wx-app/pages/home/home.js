// pages/home/home.js
import {bannerRequest,iconRequest,recommendRequest} from "../../apis/modules/homeApi"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData:[],
    iconData:[],
    remmondList:[]
  },
  fetchSwiperData(){
    bannerRequest({},"GET").then(res=>{
      this.setData({
        swiperData:res.data.message
      })
    })
    // var reqTask = wx.request({
    //   url: 'http://127.0.0.1:4000/home/swiperdata',
    //   method: 'GET',
    //   success: (result)=>{
    //     console.log(result);
    //     this.setData({
    //       swiperData:result.data.message
    //     })
    //   }
    // });
  },
  async fetchIconData(){
    // 小程序默认不支持await
    const res = await iconRequest()
    this.setData({
      iconData:res.data.message
    })
  },
  async fetchRecommendData(){
    const res = await recommendRequest()
    // console.log(res);
    this.setData({
      remmondList:res.data.message
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchSwiperData()
    this.fetchIconData()
    this.fetchRecommendData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.fetchSwiperData()
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
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          title:"蜗牛商城2",
          // 分享图片，如果不自己填写图片，默认当前页面截图
          path:"/pages/home/home?id=1"
        })
      },2000)
    })
    return {
      title:"蜗牛商城",
      // 分享图片，如果不自己填写图片，默认当前页面截图
      imageUrl:"https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/xuchaobo/20210801234622.jpg",
      path:"/pages/home/home?id=1",
      promise
    }
  }
})