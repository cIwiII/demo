import Vue from 'vue'
import Vuex from 'vuex'
import mealModule from './modules/mealModule'
import menuModule from './modules/menuModule'
import swiperModule from './modules/swiperModule'
import userModule from './modules/userModule'
import vipModule from './modules/vipModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    mealModule,menuModule,swiperModule,userModule,vipModule
  }
})
