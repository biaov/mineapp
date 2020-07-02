// 初始化应用
const http = require("http"); // 引入http模块
const express = require("express"); // 引入express框架
const app = express();
// 创建一个http服务
let server = http.createServer(app);
module.exports = {
  server,
  app
};
