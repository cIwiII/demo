// pages/category/category.js
import {categoryRequest} from "../../apis/modules/categoryApi"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有分类的数据
    categoryList:[],
    // 存放分类里面children
    productList:[],
    selectedIndex:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchCategoryData()
  },
  async fetchCategoryData(){
    const res = await categoryRequest()
    console.log(res);
    this.setData({
      categoryList:res.data.message,
      productList:res.data.message[0].children
    })
  },
  changeIndex(event){
    const index = event.currentTarget.dataset.index
    this.setData({
      selectedIndex:index,
      productList:this.data.categoryList[index].children
    })
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