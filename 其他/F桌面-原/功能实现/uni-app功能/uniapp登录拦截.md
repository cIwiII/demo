

#### uniapp登录拦截

在src/router/index.js

```js
//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页
// 页面白名单，不受拦截
const whiteList = [
  '/pages/my/my'
]
function hasPermission (url) {
  let islogin = sessionStorage.getItem("isLogin");//在这可以使用token、vuex
  islogin = Boolean(Number(islogin));//返回布尔值
    // 在白名单中或有登录判断条件可以直接跳转
    if(whiteList.indexOf(url) !== -1 || islogin) {
        return true
    }
    return false
}
uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
        if(!hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/my/my'
            })
            return false
        }
        return true
    },
    success (e) {
    }
})
 
uni.addInterceptor('switchTab', {
    // tabbar页面跳转前进行拦截
    invoke (e) {
        if(!hasPermission(e.url)){
            uni.reLaunch({
                url: '/pages/my/my'
            })
            return false
        }
        return true
    },
    success (e) {
    }
})
```



在**main.js**中引用。

```
import './router/index';//引入拦截
```

登录界面利用**sessionStorage**存储登录判断条件。

```
sessionStorage.setItem('isLogin',1);//登录判断
```

这样就简单的实现了登录拦截！！！