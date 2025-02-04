// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sele: 1,
    navArr: []
  },

  ChangeSele(event) {
    const id = event.detail.id
    this.setData({
      sele: id,
      // navArr: [
      //   { id: 1, title: "必备家电" },
      //   { id: 2, title: "热门推荐" },
      //   { id: 3, title: "进口食品" },
      //   { id: 4, title: "冷门购票" },
      //   { id: 5, title: "手机数码" },
      //   { id: 6, title: "性能电脑" },
      //   { id: 7, title: "厨卫电器" },
      //   { id: 8, title: "生活酒水" },
      //   { id: 9, title: "居家生活" },
      //   { id: 10, title: "厨房电源" },
      //   { id: 11, title: "生活电器" }
      // ]
    })
  },
  getData() {
    console.log('字I型老公')
    wx.request({
      url: "http://127.0.0.1:4000/categories",
      // data: {        start,        count      },      
      // header: {        'content-type': 'application/json'      },      
      success: (res) => {
        console.log(res)
        this.setData({
          navArr: res.data.message
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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