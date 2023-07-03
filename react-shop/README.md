## react demo

创建：npx create-react-app name

import { connect } from 'react-redux'

connect 的第二个参数：





## git 提交规范

提交规范： type: description

type：

- feat : 新功能

- add: 新功能

- docs : 文档改变

- fix : 修复bug

- update: 更新

- style : 代码格式改变

- refactor : 某个已有功能重构

- perf : 性能优化

- test : 增加测试

- build : build工具发生变化， 如 grunt换成了 npm

- revert : 撤销上一次的 commit

- chore : 构建过程或辅助工具的变动

  

description：推荐以动词开头，如： 设置、修改、增加、删减、撤销等，

新增文件-U，修改未commit-M，


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)





#### 设置私有

更改仓库属性为私有

1. 在仓库名称下，单击Settings（设置）。
2. 在“Danger Zone（危险区域）”下“Make this repository private（将此仓库设为私有）”旁边，单击Make private（设为私有）。
3. 阅读关于将仓库设为私有的警告。



#### 拉取异常

github拉取远程显示：OpenSSL SSL_read: Connection was reset, errno 10054问题

- 原因：服务器的[SSL证书](https://so.csdn.net/so/search?q=SSL证书&spm=1001.2101.3001.7020)没有经过第三方机构的签署。也可能是网络不稳定，连接超时导致。

- 解决：解除`SSL`验证

  ```js
  //解除http验证
  git config --global http.sslVerify "false"
  //解除https验证
  git config --global https.sslVerify "false"
  //再重新执行克隆命令,若还是不行，执行初始化
  git init
  ```

  如果还是不行，可以使用vpn
  方法来自于`Stack Overflow`，链接地址：https://stackoverflow.com/questions/62073660/how-can-solve-error-rpc-failed-curl-56-openssl-ssl-read-connection-was-reset

   

  如果实在无法下载，直接下载`zip`吧，或者换gitee吧（可以和github同步），毕竟github服务器远在国外。

  - Gitee 导入

  Gitee 是国内版的 GitHub，支持在新建项目时直接导入已有的 GitHub 仓库。想要下载哪个项目的源码，直接输入对应的 GitHub 仓库地址即可！

#### 提交超时

github提交push，或者clone时，提示：`Failed to connect to github.com port 443: Timed out`

- 原因：网络确实不行，其次就是代理出了点问题，重点解决代理问题。

  ```js
  //git终端，分别执行一下
  git config --global --unset http.proxy
  
  git config --global --unset https.proxy
  ```

  