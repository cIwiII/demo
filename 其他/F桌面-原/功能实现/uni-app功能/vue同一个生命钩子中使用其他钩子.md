

## 1. 在同一个组件中

```js
mounted () {
  window.addEventListener('online', this.handleOnline)
  this.$once('hook:beforeDestroy', function () {
    window.removeEventListener('online', this.handleOnline)
  })
},
```

## 2. vue中使用$.once(‘hook:beforeDestory’,() => {})清理定时器

> vm.$once( event, callback )

- 在vue项目清理定时器，通常有两种方法

### 方法一：

1、首先在vue实例的data中定义定时器的名称，
 2、在方法（methods）或者页面初始化（mounted()）的时候使用定时器
 3、然后在页面销毁的生命周期函数（beforeDestroy()）中销毁定时器
 实现代码:

```js
export default{
  data(){
    timer:null  
  },
  mounted(){
      this.timer = setInterval(()=>{
      //具体执行内容
      console.log('1');
    },1000);
  }
  beforeDestory(){
    clearInterval(this.timer);
    this.timer = null;
  }
}
```

存在问题：

1、vue实例中需要有这个定时器的实例，有点多余;

2、创建的定时器代码和销毁定时器的代码没有放在一起，通常很容易忘记去清理这个定时器，不容易维护;*

### 方法二：直接在需要定时器的方法或者生命周期函数中声明并销毁

```js
export default{
  methods:{
    fun1(){
      const timer = setInterval(()=>{
        //具体执行代码
        console.log('1');
      },1000);
      this.$once('hook:beforeDestory',()=>{
        clearInterval(timer);
        timer = null;
      })
    }
  }
}
```

