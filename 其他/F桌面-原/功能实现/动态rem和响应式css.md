#### 一、屏幕的宽度window.innerWidth;

```js
<script>
        function adapter(){
            //获取屏幕的宽度
            var width=window.innerWidth;
            // console.log(width);
            //将750作为标准屏幕
            if(width>750){
                width=750;
            }
            //设置font-size
            // console.log(width/75);
            document.documentElement.style.fontSize=width/37.5+'px';
        }
        window.onload=function(){
            adapter();
        }
        window.onresize=function(){
            adapter();
        }
    </script>
```

#### 二、动态rem

```js
//动态为根元素设置字体大小
function init () {
    // 获取屏幕宽度
    var width = document.documentElement.clientWidth
    // 设置根元素字体大小。此时为宽的10等分
    document.documentElement.style.fontSize = width / 10 + 'px'
}

//首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)
```

#### 三、css响应式

```css
@media screen and (max-width: 414px) {
  html {
    font-size: 18px
  }
}

@media screen and (max-width: 375px) {
  html {
    font-size: 16px
  }
}

@media screen and (max-width: 320px) {
  html {
    font-size: 12px
  }
}
```

