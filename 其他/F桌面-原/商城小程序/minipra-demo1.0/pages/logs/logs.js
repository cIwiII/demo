// logs.js

Page({
  data:{
    sele: 1,
    navArr:[]
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
    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
      // data: {        start,        count      },      
      // header: {        'content-type': 'application/json'      },      
      success: (res) => {
        this.setData({
          navArr:res.data.message
        })
        
      }
    })
  },

  onLoad() {

    this.getData()
    // this.setData({
    // nbTitle: '标题',
    // nbLoading: true,
    // nbFrontColor: '#ffffff',
    // nbBackgroundColor: '#000000',
    // })
  }
})
