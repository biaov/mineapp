# MINEAPP

<h2 style="text-align:center;"><a href="https://github.com/biaov/MINEAPP"><img src="https://img.shields.io/badge/version-1.0.1-blue" /></a></h2>

这是一个Hybrid APP，有一些好玩的功能！

## 功能

| --        | --       | --                 | --               |
|-----------|----------|--------------------|------------------|
| 登录/注册 | 扫一扫   | 上传图片           | 图片预览         |
| 图片下载  | 特效预览 | 图片分享到微信好友 | 图片分享到朋友圈 |
| 截屏分享  | 热更新   | 地理定位           | 微信授权         |

* 更多功能作者后续会持续更新

## 技术栈

| 名称                                                            | 描述                                                  |
|-----------------------------------------------------------------|-------------------------------------------------------|
| [uni-app框架](https://uniapp.dcloud.io/README)                  | 一个使用 Vue.js 开发所有前端应用的框架。              |
| [5+Api](http://www.html5plus.org/doc/zh_cn/accelerometer.html#) | 和手机交互的一些API。                                 |
| [VueJs](https://cn.vuejs.org/)                                  | 一套用于构建用户界面的渐进式框架。                    |
| [Vuex](https://vuex.vuejs.org/zh/)                              | 一个专为 Vue.js 应用程序开发的状态管理模式。          |
| [NodeJs](http://nodejs.cn/api/)                                 | 一个基于 Chrome V8 引擎的 JavaScript 运行时。         |
| [Express](http://expressjs.com/)                                | 一个保持最小规模的灵活的 Node.js Web 应用程序开发框架 |
| [MySql](https://www.mysql.com/)                                 | 一个关系型数据库管理系统。                            |

## 目录

```Markdown
|-- MINEAPP------------------------------- 项目名称
    |-- .gitignore------------------------ Git上传忽略文件
    |-- README.md------------------------- 项目文档
    |-- BackEnd -------------------------- 后端目录
    |   |-- package-lock.json ------------ 模块的来源及版本号文件
    |   |-- package.json ----------------- 模块描述文件
    |   |-- data ------------------------- 数据库文件目录
    |   |-- src -------------------------- 开发目录
    |-- FrontEnd ------------------------ 前端目录
    |   |-- App.vue ---------------------- 主要文件
    |   |-- copyright.md ----------------- 版权信息
    |   |-- main.js ---------------------- 入口文件
    |   |-- manifest.json ---------------- APP配置文件
    |   |-- pages.json ------------------- 节点配置应用文件
    |   |-- uni.scss --------------------- 全局scss配置文件
    |   |-- api -------------------------- 请求API
    |   |-- components ------------------- 组件目录
    |   |-- filters ---------------------- 全局过滤目录
    |   |-- pages ------------------------ 页面目录
    |   |-- static ----------------------- 静态资源目录
    |   |-- store ------------------------ Vuex状态管理目录
    |   |-- unpackage -------------------- APP配置资源目录
    |   |-- utils ------------------------ 全局配置目录
    |-- images --------------------------- 项目文档图片

```

## 运行

### 前端

* [HbuilderX](https://www.dcloud.io/hbuilderx.html)+[Android模拟器](http://www.ldmnq.com/ldy/baidu.html)

### 后端

#### 项目接口文档

* 接口文档地址：[MINEAPP](https://www.showdoc.cc/mineapps)
* 访问密码：**123456**

#### 运行后端程序

* 因为里面涉及数据库密码及配置SSL证书问题，所以需要修改一下源代码，即[init.js](https://github.com/biaov/MINEAPP/blob/master/BackEnd/src/utils/init.js)文件。
* 如果没有SSL证书，也没有关系，默认为http，及development环境。
* 数据库默认没有设置密码，如果你的数据有密码，则添加一下你的密码。

##### 全局安装NodeJs进程管理工具

```Basic
npm i -g pm2
::or
npm i -g nodemon
```

##### 进入BackEnd目录里，安装依赖包文件

```Basic
npm i
```

##### 运行项目

```Basic
npm run serve
::or
npm start
```

#### 构建数据库

* 这里使用的是集成软件[XAMPP](https://www.apachefriends.org/index.html)。

```Basic
mysql -uroot < SQL文件地址
::即:
mysql -uroot < init.sql
```

* 你可以直接安装并配置[MySQL](https://www.mysql.com/)。
* 然后在使用[Navicat Premium](http://www.navicat.com.cn/store/navicat-premium)连接数据库查看。
* MySQL文件：**[init.sql](https://github.com/biaov/MINEAPP/blob/master/BackEnd/data/init.sql)**
* MySQL表图片:

<a href="https://github.com/biaov/MINEAPP/blob/master/BackEnd/data/table.png"><img src="https://github.com/biaov/MINEAPP/blob/master/BackEnd/data/table.png" width="50%" alt="数据库表" title="数据库表"></a>

## 演示

### Android

<a href="http://appdown.biaov.cn/ugft"><img src="http://app.biaov.cn/mineapp/images/qrcode/Android.png" width="200px" alt="Android" title="Android"></a>

### H5

<a href="http://mineapph5.app.biaov.cn/"><img src="http://app.biaov.cn/mineapp/images/qrcode/H5.png" width="200px" alt="H5" title="H5"></a>

### 微信小程序

* 由于个人开发者权限不足，因此只有体验版。

<a href="https://open.weixin.qq.com/sns/getexpappinfo?appid=wxedb0edf60129ec39&path=pages%2Findex%2Findex.html#wechat-redirect" target="_blank"><img src="http://app.biaov.cn/mineapp/images/qrcode/Applet.png" width="200px" alt="微信小程序" title="微信小程序"></a>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, TalkingData.

[^_^]: 我们改变不了生活，但是我们可以改变对待生活的态度
[^_^]: 作者就是一个逗比