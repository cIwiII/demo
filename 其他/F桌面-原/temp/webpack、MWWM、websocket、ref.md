### webpack：

`webpack` 是一个用于现代`JavaScript`应用程序的静态模块打包工具

`Webpack` 最初的目标是实现前端项目的模块化，旨在更高效地管理和维护项目中的每一个资源

- 需要通过模块化的方式来开发
- 使用一些高级的特性来加快我们的开发效率或者安全性，比如通过ES6+、TypeScript开发脚本逻辑，通过sass、less等方式来编写css样式代码
- 监听文件的变化来并且反映到浏览器上，提高开发的效率
- JavaScript 代码需要模块化，HTML 和 CSS 这些资源文件也会面临需要被模块化的问题
- 开发完成后我们还需要将代码进行压缩、合并以及其他相关的优化

像`css`、`sass`、`png`等这些类型的文件的时候，`webpack`则无能为力，这时候就需要配置对应的`loader`进行文件内容的解析

配置插件；热更新；proxy代理服务器解决跨域

### MVVM、defineProperty、发布订阅，什么关系

当用户填写表单时，`View`的状态就被更新了，如果此时可以自动更新`Model`的状态，那就相当于我们把`Model`和`View`做了双向绑定关系

我们都知道 `Vue` 是数据双向绑定的框架，双向绑定由三个重要部分构成

- 数据层（Model）：应用的数据及业务逻辑
- 视图层（View）：应用的展示效果，各类UI组件
- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：`MVVM`这里的控制层的核心功能便是 “数据双向绑定” 

它的主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据

当然，它还有两个主要部分组成

- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

双向绑定的原理，采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)回调。

### websocket

浏览器与服务器通信间，传统的 HTTP 请求在某些场景下并不理想，比如实时聊天、实时性的小游戏等等，

其面临主要两个缺点：

- 无法做到消息的「实时性」；
- 服务端无法主动推送信息；

其基于 HTTP 的主要解决方案有：

- 基于 ajax 的轮询：客户端定时或者动态相隔短时间内不断向服务端请求接口，询问服务端是否有新信息；其缺点也很明显：多余的空请求（浪费资源）、数据获取有延时；

WebSocket 是 HTML5 开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。 WebSocket 通信协议于2011年被IETF定为标准RFC 6455，WebSocketAPI 被 W3C 定为标准。 在 WebSocket API 中，浏览器和服务器只需要要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

- 一旦建立连接（直到断开或者出错），服务端与客户端握手后则一直保持连接状态，是持久化连接；

```js
// 引入websocket
	var websocket = new WebSocket("ws://echo.websocket.org/");
        websocket.onopen = function(){
            console.log('websocket open');
            document.getElementById("recv").innerHTML = "Connected";
        }
        // 结束websocket
        websocket.onclose = function(){
            console.log('websocket close');
        }
        // 接受到信息
        websocket.onmessage = function(e){
            console.log(e.data);
            document.getElementById("recv").innerHTML = e.data;
        }
        // 点击发送webscoket
        document.getElementById("sendBtn").onclick = function(){
            var txt = document.getElementById("sendTxt").value;
            websocket.send(txt);
        }
```

前文说到，Websocket 是建立与 TCP 之上，那么其与 HTTP 协议有和关系呢？

Websocket 连接分为建连阶段与连接阶段，在建立连接阶段借助于 HTTP ，而在连接阶段则与 HTTP 无关。

#### WSS

在 HTTP 协议中，很多时候为了加密与安全需要使用 HTTPS 请求（HTTP + TCL）；
相应的，在 Websocket 协议中，也是可以使用加密传输的 —— wss ，比如 wss://localhost:8080。

使用的也是与 HTTPS 一样的证书，在这里一般是交由 Nginx 等服务层去做证书处理。



### react中可以ref获取类组件节点，并得到他state。但是不能用于函数组件 函数组件要获取自组件的值需要用hook来获取——useLayoutEffect

#### React的Refs方法获取DOM实例 和 访问子组件方法及属性

React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。

- ref : 绑定属性
- refs : 调用的时候使用

#### **调用子组件方法**

这是一个很神奇的方法`refs`，它可以调用子组件的方法以及属性。下面用一个例子来实现调用子组件方法。

#### **建立组件**

建立子组件`MyComponent.js`，并在子组件实现一个方法，如:`subHandleClick`，这个方法实现变更当前组件上面的文本，提供这样一个测试用例。

#### **使用子组件**

通过`import SubComponent from './SubComponent'`来引用子组件`SubComponent`，在 `render`方法中注册使用组件

```javascript
render(){  
  return(    
    <SubComponent/>
  )
}
```

#### **绑定`ref`属性**

在子组件调用上面绑定一个值为`subcomponents`的属性`ref`，`subcomponents`

```javascript
<SubComponent ref="subcomponents" />
```

#### **调用子组件方法**

在入口父组件`App.js`中，添加方法`handleClick`，去调用子组件`SubComponent.js`中的`subHandleClick`方法

```javascript
handleClick(){  
  //this.refs.subcomponents可以访问子组件的方法
  //也可以获取子组件的state...
  this.refs.subcomponents.subHandleClick();
}
```

#### **完整实例**

入口父组件`App.js`

```javascript
import React, { Component } from 'react';
import SubComponent from './SubComponent'

class MyComponent extends Component {
  handleClick(){    
    this.refs.subcomponents.subHandleClick();
  }
  render(){    
    return(      
      <div>
        <input
          type="button"
          value="点我调用子组件方法"
          onClick={this.handleClick.bind(this)}
        />
        <SubComponent ref="subcomponents" />
      </div>
    )
  }
}

ReactDOM.render(  
  <MyComponent/>, 
  document.querySelector('#app')
);
```

子组件`SubComponent.js`

```javascript
import React, { Component } from 'react';
export default class SubComponent extends Component {
  constructor(props) {
    super(props);    this.state = {
      text: '这里是初始化文本'
    };
  }
  subHandleClick(){    
    this.setState({text: '文本被改变啦！哈哈！'})
  }
  render(){    
    return(      
      <div>
        查看：{this.state.text}      
      </div>
    )
  }
}
```

#### **获取DOM实例**

通过`ref`属性，你可获取，实例中的属性方法，甚至可以通过他获取到DOM实例节点`this.refs.myInput.getDOMNode()`

#### **绑定 `ref` 属性**

```javascript
<input type="text" ref="myInput" />
```

#### **`refs` 获取DOM实例**

获取支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。

```javascript
// 输入框获取焦点
this.refs.myInput.focus()
```

#### **完整实例**

```javascript
import React, { Component } from 'react';
class MyComponent extends Component {
  handleClick(){    
    this.refs.myInput.focus();
  }
  render(){    
    return(      
      <div>
        <input 
          type="text" 
          ref="myInput" 
        />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    )
  }
}

ReactDOM.render(  
  <MyComponent/>, 
  document.querySelector('#app')
);
```