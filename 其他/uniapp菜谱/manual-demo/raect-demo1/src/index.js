import React, { StrictMode, Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux";
import { Provider } from "react-redux";
import "./hook";

// React.Prototype.hook = useGet;

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // 日志信息
  console.log('节点：',id, '更新阶段:',phase, '花费时间:',actualDuration, '最坏成本：',baseDuration)
  console.log('开始更新时间戳:',startTime, '提交时间:',commitTime)
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Profiler id='App' onRender={onRender}>
    <Provider store={store}>
      <App />
    </Provider>
  </Profiler>
);
/* root.unmount(
  console.log('first')
) */

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );
