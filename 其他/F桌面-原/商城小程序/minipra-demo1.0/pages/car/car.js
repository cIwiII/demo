// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:1,title:'待付款'},
      {id:2,title:'已付款'},
      {id:3,title:'待发货'},
      {id:4,title:'已收货'}
    ],
    state:1
  },
  ChangeState(event){
    const id=event.detail.id
    this.setData({
      state:id,
      list:[
        {id:1,title:'待付款'},
        {id:2,title:'已付款'},
        {id:3,title:'待发货'},
        {id:4,title:'已收货'}
      ],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})