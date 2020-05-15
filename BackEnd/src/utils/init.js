/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */

const { NODE_ENV } = require("./variable");
const { server, app } = NODE_ENV === "development" ? require("./http") : require("./https");

// 初始化应用
const fs = require("fs");
const express = require("express"); // 引入express框架
const session = require("express-session"); //引入express-session模块
const cors = require("cors"); // 引入cors模块
const mysql = require("mysql"); // 引入mysql模块
const multiparty = require("multiparty"); // 引入multiparty模块
const RandomName = require("chinese-random-name"); // 引入chinese-random-name模块
let router = express.Router(); // 创建一个路由
server.listen(3100); // 监听3100端口
app.use(cors()); // 处理跨域问题

// 使用session
app.use(session({
  secret: "secret", // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  cookie: {
    maxAge: 1000 * 60 * 3 // 过期时间
  },
  resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
  saveUninitialized: true // 强制将未初始化的 session 存储。  默认值是true  建议设置成true
}));

app.use("/api", router); // 使用路由中间件

// 创建连接池
let pool = mysql.createPool({
  host: "127.0.0.1", // 主机名
  user: "root", // 用户名
  password: "", // 密码
  database: "mineapp", // 数据库名
  port: 3306, // 端口号
  connectionLimit: 25 // 限制数量
});

module.exports = {
  app, // express主程序对象
  pool, // 连接池对象
  router, // 路由对象
  fs, // 读取文件模块
  multiparty, // form-data模块对象
  RandomName // 随机名模块对象
}