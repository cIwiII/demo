/**
 * 使用 ws 创建
 */
//1. 创建服务器
const Websocket = require('ws');
const clients = [];

const wsServer = new Websocket.Server({ port: 7777 }, () => {
  console.log('websocket server 7777 启动成功');
});

// 2 当某个客户端连接该服务器时
wsServer.on('connection', function (ws, req) {
  // 有新用户创建时
  console.log('ws连接成功, 参数数据:',req.url);

  clients.push({ clientWs: ws, userid: "传过来的数据" });

  // 监听绑定
  ws.on('message', function (message) {

    let text = binaryData(message);
    console.log('接受原始消息', message, '转译为', text);

    //ws.send("已收到，您发的 信息为"+message);
    ws.send(JSON.stringify({ type: '返回', data: text.data }));
  });

  ws.on('error', function (message) {
    console.log('error', message);
  });

  ws.on('close', function (message) {
    //刷新页面会关闭，然后重新开启参数为编号
    console.log('close', message);
  });
});

//二进制转换为发送时的数据类型
function binaryData(data) {
  return JSON.parse(new TextDecoder('utf-8').decode(new Uint8Array(data)));
}
