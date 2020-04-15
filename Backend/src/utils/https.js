// 初始化应用
const fs = require("fs");
const https = require("https"); // 引入https模块
const express = require("express"); // 引入express框架
const app = express();
// 创建一个https服务
let server = https.createServer({
  key: fs.readFileSync("./certs/3549986_app.biaov.cn.key"), // 读取文件
  cert: fs.readFileSync("./certs/3549986_app.biaov.cn_public.crt") // 读取文件
}, app);
module.exports = {
  server,
  app
}