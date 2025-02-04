// components/tabs/tabs.js
Component({
  /* 开启小程序非默认插槽（插槽带名字）需要额外配置，
  */
  options:{
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  //接收父组件外部传入的数据，相当于props
  properties: {
    navArr:{
        type:Array,
        value:[]  //默认值空数组
      },
      sele:{
        type:Number,
        value:1
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
    activ(event){
      let id=event.currentTarget.dataset.v
      this.triggerEvent('ChangeSele',{id},{})
    }
  }
})
