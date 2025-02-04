//主仓库(状态机)
import Vue from 'vue'
import Vuex from 'vuex'
//引入子仓库
import userModule from "./modules/userModule"
import homeModule from "./modules/homeModule"
import categoryModule from "./modules/categoryModule"
import detailModule from "./modules/detailModule"
import vipModule from "./modules/vipModule"
//使用主仓库数据
//引入vuex仓库名字（辅助函数）

//挂载到vue
Vue.use(Vuex)
export default new Vuex.Store({
	//主仓库数据
	state:{
		count:10
	},
	//子仓库模块
	modules:{
		userModule,homeModule,categoryModule,detailModule,vipModule
	}
})