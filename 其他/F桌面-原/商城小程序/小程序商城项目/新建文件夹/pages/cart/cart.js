// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    total:0,
    checkAllStatus:false
  },
  singleCheck(event){
    const index = event.currentTarget.dataset.index
    const list = this.data.goodsList
    // 被选中的商品isActive设置true
    list[index].isActive = !list[index].isActive
    this.setData({
      goodsList:list
    })
    // 只要按钮被点击，计算一下总价
    this.computedTotalPrice()
  },
  // 设计一个函数，用于计算总价
  computedTotalPrice(){
    const list = this.data.goodsList
    let total = 0
    list.forEach(item=>{
      if(item.isActive){
        total+=item.goods_price * item.number
      }
    })
    this.setData({
      total
    })
  },
  checkAll(){
    const list = this.data.goodsList
    this.setData({
      checkAllStatus:!this.data.checkAllStatus
    })
    // 判断checkAllStatus是否true
    if(this.data.checkAllStatus){
      list.forEach(item=>item.isActive = true)
    }else{
      list.forEach(item=>item.isActive = false)
    }
    this.setData({
      goodsList:list
    })
    // 调用总价计算
    this.computedTotalPrice()
  },
  changeNumber(event){
    const num = event.currentTarget.dataset.params
    const index = event.currentTarget.dataset.index
    console.log(num,index);
    const list = this.data.goodsList
    const item = list[index]
    // 先加减，在判断
    // 获取到的参数默认都是字符串，使用记得转化
    item.number+=parseInt(num)

    if(item.number == 0){
      item.number=1
      wx.showToast({
        title: '商品最少一件',
        icon: 'none',
      });
    }else{
      // 最多购买5件
      if(item.number == 6){
        item.number = 5
        wx.showToast({
          title: '商品最多购买5件',
          icon: 'none',
        });
      }
    }
    this.setData({
      goodsList:list
    })
    this.computedTotalPrice()

    // if(item.number == 1){
    //   wx.showToast({
    //     title: '最少1件',
    //     icon: 'none',
    //   });
    // }else {

    // }

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
    // onShow代表只要进入这个页面我们就可以执行一次
    const cart = wx.getStorageSync("cart") || [];
    if(cart.length > 0){
      // 每一个商品都有选中状态
      const goodslist = cart.map(item=>{
        // 数组中的每个商品都有一个选中状态
        item.isActive = false;
        return item
      })
      this.setData({
        goodsList:goodslist
      })
    }
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