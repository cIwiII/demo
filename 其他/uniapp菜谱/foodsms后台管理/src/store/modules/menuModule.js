import { Message } from 'element-ui'
//身份认证
import $http from '@/request/http'

export default {
    namespaced: true,
    state: {
        allMenu: [],
        stoMenuObj: {
            _id: '', isFree: '', isHot: '', name: '', needtime: ''
        },
        //添加轮播使用
        allMenus: []
    },
    getters: {
    },
    mutations: {
        changeAllMenu(state, v) {
            state.allMenu = v
        },
        changeMenuObj(state, v) {
            state.stoMenuObj = v
        },
        changeAllMenus(state, v) {
            state.allMenus = v
        },
    },
    actions: {
        async getAllMenu(context, obj) {
            //可选。默认{pageSize=12,currentPage=1}
                const res = await $http.menu.getAllMenu(obj);
                console.log('所有菜品返回', res)
                if (res.data.meta.status == 200) {
                    context.commit('changeAllMenu', res.data.menus)
                }
        },
        async searchMenu(context, v) {
            //可选。默认{pageSize=12,currentPage=1,val=''}
            let obj = { pageSize: 100, currentPage: 1, val: v }
            const res = await $http.menu.searchMenu(obj);
            console.log('搜索结果返回', res)
            if (res.data.meta.status == 200) {
                context.commit('changeAllMenu', res.data.menus)
            } else {
                console.log('查询失败')
            }
        },
        async menuDetail(context, _id) {
            const res = await $http.menu.menuDetail(_id);
            console.log('获取修改对象返回', res)
            let obj = { _id: '', isFree: '', isHot: '', name: '', needtime: '' };
            if (res.data.meta.status == 200) {
                let newobj = res.data.message[0]
                obj._id = newobj._id;
                obj.isFree = newobj.isFree;
                obj.isHot = newobj.isHot;
                obj.name = newobj.name;
                obj.needtime = newobj.needtime;
                context.commit('changeMenuObj', obj)

            } else {
                console.log('修改对象获取失败')
            }

        },
        async updateMenu(context, obj) {
            //{_id,isFree,isHot,name,needtime}
            const res = await $http.menu.updateMenu(obj);

            console.log('确认修改返回', res)
            return res
        },
    },
    modules: {

    }
}