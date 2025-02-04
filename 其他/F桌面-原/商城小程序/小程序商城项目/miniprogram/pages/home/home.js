// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData:[],catitemsData:[],floorData:[],
  },
  fetchSwiperData(){
    var reqTask = wx.request({
      url: 'http://127.0.0.1:4000/home/swiperdata',
      method: 'GET',
      success: (result)=>{
        // console.log(result);
        this.setData({
          swiperData:result.data.message
        })
      }
    });
  },
  fetchCatitemsData(){
    var reqTask = wx.request({
      url: 'http://127.0.0.1:4000/home/catitems',
      method: 'GET',
      success: (result)=>{
        // console.log(result);
        this.setData({
          catitemsData:result.data.message
        })
      }
    });
  },
  fetchFloordataData(){
    var reqTask = wx.request({
      url: 'http://127.0.0.1:4000/home/floordata',
      method: 'GET',
      success: (result)=>{
        // console.log(result);
        this.setData({
          floorData:result.data.message
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchSwiperData()
    this.fetchCatitemsData()
    this.fetchFloordataData()
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

  }
})