import Vue from 'vue'
//每次只能写一个，需要在main。js中加载一次
Vue.directive('focus',{
    inserted(el){
        console.log(el);
        //focus,js方法获取焦点
        el.focus()
    }
})

Vue.directive('bgcolor',{
    inserted(el,obj){
        console.log(el,obj);
        //focus,js方法获取焦点,颜色用obj.value
        el.style.backgroundColor='red'
    }
})
// 使用v-bacolor="'pink'",加'值为字符串，再加一个‘号
//使用指令时可以传递一个指令的值，获取值，进行业务换算
/* 
参数一：代表绑定的节点
参数二：是一个对象 
*/

Vue.directive('auth',{
    inserted(el,obj){
        // console.log(el,obj);
        //focus,js方法获取焦点,颜色用obj.value
        //匹配权限，删除禁用隐藏
        let val=JSON.parse(sessionStorage.getItem('userInfo') ||'{}')
        if(!obj.value.includes(val.auth)){
            // 删除当前按钮
            el.remove()
        }
        
    }
})