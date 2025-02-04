// components/Tabs/Tabs.js
Component({
  // 开启插槽功能
  options:{
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeChoose(event){
      const index = event.currentTarget.dataset.index
      this.triggerEvent("changeIndexTabs",{index},{})
    }
  }
})
