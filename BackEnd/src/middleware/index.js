/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */
const Valid = require("./valid"); // 路由中间件验证
const ErrorMiddleware = require("./Error"); // 路由中间件验证
const { app } = $api.Require("utils");
// 循环遍历全局自定义中间件
for (const key in ErrorMiddleware) {
  app.use(ErrorMiddleware[key]); // 全局使用自定义中间件
}

module.exports = { Valid }