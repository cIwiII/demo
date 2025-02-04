import Vue from 'vue'
import Vuex from 'vuex'
import userInfoModul from './modules/userInfoModul'
Vue.use(Vuex)

export default new Vuex.Store({
  //存放仓库数据  this.$store.state
  state: {
    username: 'xiaowang',
    count: 0,
    count2: 10,
    journal: [],
    headNavArr: [
      {pathName:"首页",path:'/home'}
    ],
    staffArr:[
      {id:1 , name : "小王" , age :20 , dept:"研发部" , bir: "1990-09-08" , time : "2010-09-08" },
      {id:2 , name : "小王2" , age :40 , dept:"销售部" , bir: "1993-07-08" , time : "2021-09-08" },
      {id:3 , name : "小王3" , age :70 , dept:"市场部" , bir: "2019-07-08" , time : "2019-09-08" },
      {id:4 , name : "小王4" , age :15 , dept:"物流部" , bir: "1989-09-08" , time : "2017-09-08" }

    ]

  },
  //组件中的计算属性
  getters: {
  },
  //存放函数=methods，修改数据必须经过mutations提供的函数
  mutations: {
    putName(state,obj){
      // console.log(name)
     let Aobj= state.staffArr.find(v=>v.id==obj.id)
        Aobj.name=obj.newName
    },
    changeCount(state, val) {
      state.count2 += val
    },
    jour(state, obj) {
      state.count++
      obj.id = state.count
      state.journal.push(obj)
    },
    deleteJour(state, v) {
      state.journal = state.journal.filter(i => i.id != v)
    },
    //头部导航
    headPush(state, obj) {
      let a = state.headNavArr.find(v => v.path == obj.path)
      if (!a) {
        state.headNavArr.push(obj)
      }
    },
    //移除
    headRemove(state, path) {
      state.headNavArr=state.headNavArr.filter(v=>v.path!=path)
    }
  },
  //存放异步函数
  actions: {
  },
  //模块化当前为主仓库，管理子仓库
  modules: {
    userInfoModul
  }
})
