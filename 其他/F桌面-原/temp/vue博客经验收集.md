#### 1、Computed 和 Watch 的区别

Computed：计算属性，依赖的是数据发生改变时，就会重新计算。

Watch：指定的数据发生变化时，执行对应的业务，返回一个值赋予新的变量，因此需要定义一个新的变量存储返回的值

 

#### 2、Vue中的$nextTick 原理及作⽤

https://juejin.cn/post/6919373017218809864#heading-18

作用：Vue 在更新 DOM 时是异步执行的，当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中***\*所有数据变化完成\****之后，再统一进行更新。

$nextTick就是JavaScript事件循环的应用。

```js

---------------------------------
 this.$nextTick(function () {
  console.log(this.$el.textContent) // => '修改后的值'
})
---------------------------------
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
await this.$nextTick()
console.log(this.$el.textContent) // => '修改后的值'
```

会用到nextTick的情况：1、a数据随着b数据变化而变化，获取a数据的操作就要使用nextTick。类似计算属性。

2、created()钩子中获取节点

```js
created(){   
    //获取页面数据的操作放在$nextTick里.
  this.$nextTick(()=>{  //这是一个微任务，页面加载完成后执行。
       document.getElementById("box")   
   })
    this.$nextTick('destroyed',()=>{
        //destroyed钩子函数需要执行的内容。
    })
}
```



#### 3、Vue-router跳转和location.href有什么区别

 Vue-router跳转和location.href有什么区别

● 使⽤ location.href= /url 来跳转，简单⽅便，但是刷新了⻚⾯；

● 使⽤ history.pushState( /url ) ，⽆刷新⻚⾯，静态跳转；

● 引进 router ，然后使⽤ router.push( /url ) 来跳转，使⽤了 diff 算法，实

现了按需加载，减少了 dom 的消耗。其实使⽤ router 跳转和使⽤

history.pushState() 没什么差别的，因为vue-router就是⽤了

history.pushState() ，尤其是在history模式下。

 

#### 4、React中什么是受控组件和⾮受控组件？

受控组件：组件状态受外部数据影响，受控组件一般需要初始状态和一个状态更新事件函数。

⾮受控组件：不受我们控制的组件，一般情况是在初始化的时候接受外部数据，然后自己在内部存储其自身状态，初始值使用：defaultValue=""，<input type="text" ref={this.usernameElement2} />：没有绑定value值。

readOnly：代表只读，但是可以复制内容

disabled：代表禁用，内容只能访问不能复制

value：受控属性

defaultValue：默认的value值，不会被state控制

 

 

#### 5、说说React 事件机制

1、React 上注册的事件最终会绑定在document这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)

2、React 自身有一套事件冒泡机制，所以 event.stopPropagation()无效。

3、React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback

4、React 有一套自己的合成事件（SyntheticEvent）

 

 

#### 6、什么是XSS/CSS

防御措施（对用户输入内容和服务端返回内容进

行过滤和转译）

。现代大部分浏览器都自带 xSS 筛选器，vue/react 等成熟框架也对 XSS 进行一些防护

•即便如此，我们在开发时也要注意和小心

•对用户输入内容和服务端返回内容进行过滤和

转译

•重要内容加密传输

•合理使用get/post等请求方式

•对于URL携带参数谨慎使用

•我们无法做到彻底阻止，但是能增加黑客攻击

成本，当成本与利益不符时自然会降低风险

 

跨站脚本攻击。它是指攻击者往web页面或url里插入恶意JavaScript脚本代码且应用程序对用户输入的内容没有过滤，那么当正常用户浏览该页面时，嵌入在web页面的恶意JavaScript脚本代码会被执行，从而达到恶意攻击正常用户的目的。

***\*漏洞的位置\****：数据交互与输出的地方。

***\*漏洞产生的两个条件\****：1.用户可以控制的输入点。

​          2.输入能返回到前端的页面上被浏览器当成脚本语言解析执行。

***\*xss漏洞的危害\****：获取用户cookie、键盘记录、xss gets hell、刷流量，执行弹窗广告、传播蠕虫病毒。

***\*xss防御\****：使用htmlspecialchars函数进行实体编码、使用http only对cookie进行限制、对用户输入的内容进行过滤。

***\*xss的分类\****：

1.反射性xss：它是非持久型，参数型的跨站脚本。

2.存储型xss：它是将脚本代码写进数据库可以永久保存数据，危害最大。

3.DOM型xss：与反射性相似，但是DOM是树形结构，利用DOM标签。

 

***\*解决：\****

1、在标签内部，先闭合前面的标签，再写xss语句。如：><script>alert(1)</script>

2、使用事件。如：onclick 鼠标点击触发、onload  页面加载完后触发、onerror 页面加载出错触发等。

3、伪协议：javascript

 

xss为什么要变型？

因为不同的网站有不同的过滤机制，会对xss攻击中的敏感函数进行过滤，通过xss变形可以绕过一些过滤机制。

我写一些xss的变形方式：1.大小写转换。2.引号的使用。3.左斜线代替空格。4.对标签内的属性进行转码。5.双写绕过。

 

#### 7、请实现一个成功状态的Promise，并在1秒后输出成功的数据

new Promise(resolve=>{
  setTimeout(()=>{
    resolve(1)
  },1000)
}).then(res=>{
  console.log(res)
})

 

#### 8、说5个HTTP请求常见的状态码，并说出对应解释

200 - 服务器成功返回网页

304 （未修改） 自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。

400 （错误请求） 服务器不理解请求的语法

404 - 请求的网页不存在

503 - 服务不可用





## Vue面试题汇总

### 一、响应式原理

总体回答：

1. 通过数据劫持的方式来实现对data数据的监听。Object.defineProperty这个方法来实现数据劫持，提供getter和setter两个方法，getter代表检测到我们使用了data中的数据。有可能是{{}}里面使用，console.log直接data中的数据.在getter里面进行依赖收集,收集当前我们页面中哪些地方使用了data数据/

   一旦检测对data中的数据进行赋值\修改,我们进入setter方法,完成data数据更新,页面响应式数据更新

2. 观察者模式(发布订阅模式)是一种设计模式,提供一个Watcher和Dep对象,Watcher负责调用render方法来通知页面进行更新,Dep负责管理对应Watcher,一旦对应的set方法里面数据检测到变化.dep来通知对应watcher进行页面更新.

依赖收集:我们需要检测到哪些节点是使用了{{}}语法类进行页面更新,只要发现有使用{{}}需要将这个节点,创建对应Watcher对象进行监听.依赖收集,建立 数据和DOM节点关系,收集的就是这个关系

设计模式:前人在开发过程中总结出来的一些开发方式,经验等等.将这些内容汇总成特定的代码.按照这种代码来设计,使用了这种设计模式.本身并不是代码,本身是一种思想.代码更易于管理\扩展\减少冗余

假设我要创建50对象,可以一个一个的new.设计出了一种模式,工厂模式,这个设计模式专门提供一个工厂来创建对象,以后你只需要告诉这个工厂,你要创建多少个对象.

AST:抽象语法树,在页面进行遍历的时候,Vue的temnplate模板里面代码是无法被浏览器直接识别.很多特殊语法.:class\[@click](https://github.com/click)

```
<div :class="params"><div class="box">    params:"box"
```

需要将templatehtml代码转化未一刻抽象DOM树,采用对象的方式来组织,这样我们后续就可以将抽象语法树转化为虚拟dom,进行更新

### 二.v-model语法糖

```
<input :value="msg" @input="check">  @change
check(event){    msg = event.target.value}
```

### 三.数据劫持缺点

```
data(){
    return{
        msg:{
            id:1,name:"xiaowang"
        },
        array;[]
    }
}
this.msg.name = "xiaofeifei" //页面能够检测更新
this.msg.address = "武侯区" //页面不能检测到更新.
this.$set(对象,"属性",值)  //动态给msg对象新增一个属性,页面能够检测到更新
this.array.push(1) //页面能够检测
this.array[1] = '2' //页面检测不到
```

### 四.要封装一个组件,如何考虑

封装组件我们解决什么问题?

组件封装为了达到复用的效果.

组件封装为了将页面结构进行合理的组织.采用模块的方式来组织页面.而不是一个页面融合了很多html代码

一个组件要达到复用的效果:

1. 组件内部的数据需要动态变化,需要props接受外部的参数,实现内部的数据变化
2. 考虑引入插槽来实现组件内部,布局模块的动态变化.一个表格组件,表头是动态,调用这个表格的时候,通过插槽的方式定义表头,组件内部基于插槽来动态渲染表格.
3. 组件内部的可读性\可维护性

### 五.过滤器

在Vue2中我们可以使用,Vue3取消过滤器.

一般使用过滤器实现页面数据的动态处理,比如电话号码.日期转化.

```
{{date | dataFormatFilter}}
```

### 六.v-model可以在组件上使用

```
<Child v-model="msg"><Child :value="msg" @input="xxx">
```

### 七.$nextTick

比如在Created生命周期里我们无法获取页面节点,这个时候页面还没瓜挂载完毕

```
created(){    
  this.$nextTick(()=>{   
      document.getElementById("box")    
  })
}
```

只要页面完成的更新(挂载完毕)Vue底层调用$nextTick函数传递的回调函数

比如,我们进入页面发送异步请求,当我还没得到异步请求结果的时候,你要拿页面中数据,获取不到的.

我们把获取页面数据的操作放在$nextTick里.

$nextTick就是JavaScript事件循环的应用.

程序一旦运行,我们会将回调函数微任务队列中,在主线程执行完毕后,执行这个回调函数

### 八、mixin混入

假设我们遇到多个组件有相同页面布局或者css样式。我们首先考虑将公共布局代码、css样式提取出来。

提取一个公共的组件，在其他组件中引入这个组件。

多个页面（组件），data、method很多都一样的情况。可以在提取一个mixin混入出去

```
PageA
export default {
    data(){
        return{
           id:1,
            name:"xiaowang",
            addresss:"wuhouqu"
        }
    },
    methods:{
        update(){
        }
    }
}

PageB
export default {
    data(){
        return{
           id:1,
            name:"xiaowang",
            addresss:"wuhouqu",
            age:20
        }
    },
    methods:{
        update(){
        }
    }
}
```

可以提取公共的data、methods、computed、watch代码到混入代码中

src目录下面单独会有一个文件夹mixins

里面comm.js代码，里面包含公共的代码

```
export default {
    data(){
        return{
           id:1,
            name:"xiaowang",
            addresss:"wuhouqu"
        }
    },
    methods:{
        update(){
        }
    }
}
```

PageA

```
import comm from "./src/comm.js"
export default {
    mixins:[comm]
    data(){
        return{
        }
    },
    methods:{
    }
}
```

PageB

```
import comm from "./src/comm.js"
<template></template>
<style></style>
<script>
export default {
    mixins:[comm]
    data(){
        return{
           age:20，
            name:"xiaofeifei"
        }
    },
    methods:{
    }
}
</script>
```

引入外部混入的时候，默认和当前的这个页面代码合并在一起。

如果当前页面还有自己的data、methods等等，合并在一起

混入的代码数据和内部data数据发生冲突，以我们内部的数据为准

extends

```
let extend = {
    data(){
        return(){
            id:1,name:"xiaowang"
        }
    }
}
<script>
export default {
    mixins:[comm],
    extends:extend
    data(){
        return{
           age:20，
            name:"xiaofeifei"
        }
    },
    methods:{
    }
}
</script>
```

### 九、SSR和CSR

CSR：客户端渲染 Client（客户端） Vuejs这个框架

SSR：服务器渲染 Server（服务器）nuxt.js这个框架，在Vue基础上继续完成后端渲染

CSR：典型的前后端分离后，后端提供接口，前端浏览器获取数据渲染数据

SSR：代码放在服务器运行，直接在服务器那边进行数据渲染，浏览器得到是渲染完成后完整页面

SSR：首屏渲染更快。更利于SEO

运行环境要麻烦一些，一般那种情况才会左ssr.

比如要写公司官网，蜗牛官网。我们需要seo，想用vue开发。

【完】