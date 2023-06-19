<template>
  <div align="center">
    <el-row style="width: 80%;">
      <!-- 用户列表-->
      <el-col :span="6">
        <el-card style="width: 100%;height: 800px">
          <div style="text-align: center;font-size: 28px;margin-bottom: 10px">
            当前聊天室成员</div>
          <div
               style="height: 700px;overflow-y:auto;border:1px solid #000000;border-radius: 5px">
            <div v-for="(item,index) in userList" :key="index"
                 style="padding: 10px;margin-top: 10px;font-size: 20px">
              {{item}}
            </div>
          </div>

        </el-card>
      </el-col>
      <!--聊天室-->
      <el-col :span="18">
        <div style="width: 100%;">
          <el-card style="width: 100%;height: 800px">
            <div style="text-align: center;font-size: 28px;margin-bottom: 10px">
              一起聊天吧</div>
            <div
                 style="width: 100%;height: 550px;border:1px solid #000000;border-radius: 5px;overflow-y:auto;margin-bottom: 10px">
              <div v-for="(item,index) in msgList" :key="index">
                <!--                {{item.from}}{{item.msg}}{{item.time}}-->
                <div align="right" v-if="item.from===user"
                     style="color: dodgerblue">
                  {{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.msg}}<el-tag
                          size="mini">{{item.from?'我':'自己'}}</el-tag>
                </div>
                <div align="left" v-else style="color: coral">
                  <el-tag size="mini" type="danger">{{item.from}}</el-tag>
                  {{item.msg}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}
                </div>
              </div>
            </div>
            <el-input @keyup.enter.native="send" type="textarea"
                      v-model="message.msg"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入聊天内容"></el-input>
            <div align="right">
              <el-button type="primary" style="margin-top: 10px" @click="send">
                发送</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      // 登录用户
      user: '自己',
      // 消息记录列表
      msgList: [],
      // 发送的消息
      message: {
        time: null,//时间
        to: '',//发给谁
        from: '自己',
        msg: ''
      },
      newws: null,
      // 在线用户列表
      userList: []
    }
  },
  methods: {
    init() {
      let that = this;
      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        //服务器地址
        var socketUrl = "ws://localhost:8081/socket/";
        // 开启一个websocket服务
        var ws = new WebSocket(socketUrl);
        //打开事件
        ws.onopen = function () {//服务器连接成功
          console.log("websocket已打开");
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        ws.onmessage = function (msg) {//解析信息
          console.log("收到数据====" + msg.data)
          let data = JSON.parse(msg.data)
          if (data.userNames) {
            // userNames存在则是有人登录，获取在线人员信息
            that.userList = data.userNames
          } else {
            // userNames不存在则是有人发消息
            that.msgList.push(data)
          }
        };
        //关闭事件
        ws.onclose = function () {//服务器连接关闭
          console.log("websocket已关闭");
        };
        //发生了错误事件
        ws.onerror = function () {//服务器连接出错
          console.log("websocket发生了错误");
        }
        this.newws = ws

      }
    },
    //点击发送事件
    send() {
      if (!this.message.msg) {
        this.$message({
          message: '大兄弟，请输入聊天消息！',
          type: 'warning'

        });
      } else {
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          this.message.from = this.user;
          this.message.time = new Date().toLocaleTimeString();
          this.newws.send(JSON.stringify(this.message));//发送请求
          this.message.msg = '';
        }
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>