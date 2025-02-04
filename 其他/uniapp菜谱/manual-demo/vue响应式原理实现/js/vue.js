// Vue提供了一个Observer类来进行数据劫持
// 这个类主要就是针对我们页面Vue对象中data进行数据劫持
class Observer {
    constructor(data) {
        this.data = data
        this.walk()
    }
    // 这个方法就是针对你传递进来的data进行数据劫持
    defineReactive(data,key,value) {
        const dep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                // 依赖收集
                // 将wathcer存放到dep对象
                // 页面console.log执行get 页面{{username}}
                if(Dep.target){
                    dep.subs.push(Dep.target)
                }
                console.log(`${data}对象的${key}属性被调用`);
                return value
            },
            set(val) {
                // 检测到页面修改的指定的属性
                // 调用dep通知所有的watcher进行页面更新
                console.log(`${data}对象的${key}属性被赋值`);
                value = val
                // 让dep来通知所有的Wathcer进行页面更新
                dep.notify()
            }
        })
    }

    walk(){
        Object.keys(this.data).forEach(key => {
            this.defineReactive(this.data,key,this.data[key])
        });
    }
}

class Vue{
    // 创建Vue对象的时候，传递进来的对象
    constructor(options){
        this.$options = options
        this.$data = options.data()
        this.$el = options.el
        //  针对$data这个对象里所有属性进行数据劫持
        new Observer(this.$data)
        // 针对Vue对象上面的属性进行劫持
        this.proxy()
        // 实现模板编译，显示数据
        new Complier(this.$el,this.$data)

    }
    // 需要将传递进来$data数据，绑定到Vue对象身上
    // this.username
    // this.$data.username
    // Vue对象身上默认会有属性，Vue里$data也会有属性
    proxy(){
        Object.keys(this.$data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                    return this.$data[key]
                },
                set(val){
                    this.$data[key] = val
                }
            })
        })
    }
}

// 模板编译代码
// 专门用于模板编译
class Complier{
    // 获取到Vue根节点，data
    // $el:"#app"
    constructor(el,data){
        this.$el = document.querySelector(el)
        this.$data = data
        this.complier()
    }
    complier(){
        // this.$el.children.forEach(item=>{
        //     console.log(item)
        // })
        // 遍历所有的子标签，寻找子标签中间有{{}}
        [...this.$el.children].forEach(item=>{
            if(/\{\{([a-zA-Z0-9]+)\}\}/.test(item.innerHTML)){
                // RegExp.$1 代表获取到 正则表达式第一个 ()里面文本
                const key = RegExp.$1.trim()
                console.log(key);
                // 这个代码是直接渲染到页面上。底层不是直接操作
                // render方法就是页面上渲染方法
                const render = ()=>item.innerHTML = this.$data[key]
                render()
                // 给页面的元素创建Watcher对象
                new Watcher(render)

            }
        })
    }
}
// 创建订阅者（Watcher）
class Watcher{
    // 接受render方法，完成页面渲染
    constructor(callback){
        // Dep类新增了一个静态属性，this代表当前watcher
        Dep.target = this
        this.callback = callback
        this.update()
        Dep.target = null
    }
    update(){
        this.callback()  //也就是调用回调reder，重新渲染
    }
}

// 创建一个发布者
class Dep{
    constructor(){
        // 存放所有我需要管理Watcher
        this.subs = []
        //新增静态watcher
        // Dep.target = Watcher
    }
    notify(){
        // 通知所有watcher进行页面修改
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}

