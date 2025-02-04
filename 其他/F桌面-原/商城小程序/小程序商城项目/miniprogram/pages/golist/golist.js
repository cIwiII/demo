import {goodsRequest} from "../../apis/modules/goodsApi"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:1,title:"销售商品",isActive:true},
      {id:2,title:"热门商品",isActive:false}
    ],
    productList:[]
  },
  changeIndexTabs(event){
    const index = event.detail.index
    const mytabs = this.data.tabs
    mytabs.forEach(item=>item.isActive=false)
    mytabs[index].isActive = true
    this.setData({
      tabs:mytabs
    })
  },
  async fecthProductList(){
     const res = await goodsRequest()
    this.setData({
      productList:res.data.message
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fecthProductList()
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