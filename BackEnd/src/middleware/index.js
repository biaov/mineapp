/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */
const ErrorMiddleware = require("./Error"); // 路由中间件验证
const { app } = require("@/utils");
// 循环遍历全局自定义中间件
for (const key in ErrorMiddleware) {
  app.use(ErrorMiddleware[key]); // 全局使用自定义中间件
}
