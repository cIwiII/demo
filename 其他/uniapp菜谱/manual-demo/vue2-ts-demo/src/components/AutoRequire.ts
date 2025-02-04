/*
 * 2022-06-28 15:05:51
 * @Description: 对AutomationComponents文件夹中的文件实现自动注册不需要任何操作
 * 规则：AutomationComponents文件夹中的文件name必填并要大写开头如：AutoTest
 * 页面使用：<auto-test>
 */
const requireComponent = require.context(
  './AutomationComponents', // 其组件目录的相对路径
  true,// 是否查询其子目录
  /\.vue$/  // 匹配基础组件文件名的正则表达式， 官方 /Base[A-Z]\w+\.(vue|js)$/
)
const components:any = []
requireComponent
  .keys()
  .forEach((file) => {components.push(requireComponent(file).default)})
 
const install = function (Vue:any) {
  if ((install as any).installed) {
    return
  }
  components.map((component:any) => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
const CSUI = {
  install,
  ...components
}
export default CSUI