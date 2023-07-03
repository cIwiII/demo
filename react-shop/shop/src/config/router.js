import Login from "../pages/Login"
import Registration from "../pages/Registration"
import NoFind from "../pages/NoFind"
import Home from "../pages/Home"
import { allPage, includes } from "../const/menus"

//有children的一级菜单可能会报错
function renderMenus() {
    //用户的权限路由数组获取
    const userInfo=localStorage.getItem('userInfo')
    if(!userInfo){return []}
    const { role } = JSON.parse(userInfo)
    //取两书组交集。可以使用lodash
    let newArr = []

    if(role){
        role.menus.forEach(v => {
            if (allPage.includes(v)) {
                newArr.push({ path: v, component:Home, auth: true })
            }
        })
        /** 添加白名单路由 */
        includes.forEach(v => {
            newArr.push({ path: v, component:Home, auth: true })
        })
    }
    console.log(44,newArr, role.menus)
    return newArr
}

let routes = [
    ...renderMenus(),
    { path: "/login", component: Login },
    { path: "/registration", component: Registration },
    { path: "/404", component: NoFind }
]
export default routes

