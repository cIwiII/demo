import { goodsRequest } from "../../apis/modules/goodsApi"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 1, title: "销售商品", isActive: true },
      { id: 2, title: "热门商品", isActive: false }
    ],
    productList: [],
    currentPage: 1,
    pageSize: 6,
    totalPage: 0
  },
  changeIndexTabs(event) {
    const index = event.detail.index
    const mytabs = this.data.tabs
    mytabs.forEach(item => item.isActive = false)
    mytabs[index].isActive = true
    this.setData({
      tabs: mytabs
    })
  },
  async fecthProductList() {
    const { currentPage, pageSize } = this.data
    const res = await goodsRequest({ currentPage, pageSize })
    console.log(res);
    this.setData({
      // 将两个数组合并成一个数组
      productList: [...this.data.productList,...res.data.message],
      // PC端需要总页码显示出来。不需要显示总页码 3.5
      totalPage:res.data.total/this.data.pageSize
    })
  },
  addCart(event){
    const item = event.currentTarget.dataset.params
    console.log(item);
    // 判断有没有购物车,每次操作购物车先判断本地是否存在
    const cart = wx.getStorageSync("cart") || [];
    // findIndex查找指定的是否存在
    console.log(item.goods_id);
    // 获取购物车来进行判断
    let index = cart.findIndex(element=>element.goods_id == item.goods_id)
    console.log(index);
    // 判断商品是否存在
    if(index == -1){
      // 原始数据没有数量的。
      item.number = 1
      cart.push({...item})
      wx.setStorageSync("cart",cart)
      wx.showToast({
        title: '加入成功',
        duration: 1500
      });
    }else{
      wx.showToast({
        title: '商品存在',
        duration: 1500,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options);
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
    console.log(123);
    // 如果下拉刷新想要换一批商品，需要后端接口来动态给你们生成新的商品
    this.fecthProductList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断当前你的页码 是否已经是最大页码
    if(this.data.currentPage >= this.data.totalPage){
      // 提示已经到底了，无法加载更多
      // duration代表2s后自动消失
      wx.showToast({
        title: '到底了！',
        icon: 'success',
        duration: 2000
      })
    }else{
      this.setData({
        currentPage:++this.data.currentPage
      })
      this.fecthProductList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})