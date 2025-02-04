// pages/cart/cart.js
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    cart: [], allChoose: false,
    //选中商品的总价格
    totalPrice: 0,
  },
  allChooseChange(event) {
    const valueArr = event.detail.value;//获取选中的数组
    let newArr = this.data.cart
    let total = 0;
    if (valueArr.length) {
      newArr.forEach(v => {
        v.is_promote = 'true';//全部选中
        total += v.goods_price * v.number
      });
    } else {
      newArr.forEach(v => {
        v.is_promote = 'false';//全部不选中
      });
    }
    this.setData({
      totalPrice: total
    })
    wx.setStorageSync("cart", newArr)
    this.setData({
      cart: wx.getStorageSync("cart") || []
    })
  },
  checkboxChange(event) {
    const idArr = event.detail.value;//获取选中的数组
    //全部被选中为true
    const bo = this.data.cart.length == idArr.length
    if (bo) {
      this.setData({
        allChoose: true
      })
    } else {
      this.setData({
        allChoose: false
      })
    }
    //商品被改变选中状态
    let newArr = this.data.cart
    let total = 0;
    newArr.forEach(v => {
      if (idArr.includes(v._id)) {
        v.is_promote = 'true';
        total += v.goods_price * v.number
      } else {
        v.is_promote = 'false';
      }
    });
    wx.setStorageSync("cart", newArr)
    this.setData({
      totalPrice: total,
      cart: wx.getStorageSync("cart") || []
    })
    // console.log(this.data.cart) //检查和本地存储数据是否一致
    console.log('checkboxChange执行完毕')
  },
  changeNumber(event){
    const num = event.currentTarget.dataset.params
    const index = event.currentTarget.dataset.index
    console.log(num,index);
    const list = this.data.cart
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
      cart:list
    })
    //总价变化
    let newArr = this.data.cart
    let total = 0;
    newArr.forEach(v => {
      if (v.is_promote == 'true') {
        total += v.goods_price * v.number
      }
    });
    this.setData({
      totalPrice: total,
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
    this.setData({
      cart: wx.getStorageSync("cart") || []
    })
    //进入页面渲染选中总价
    let newArr = this.data.cart
    let total = 0;
    newArr.forEach(v => {
      if (v.is_promote == 'true') {
        total += v.goods_price * 1
      }
    });
    this.setData({
      totalPrice: total
    })
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