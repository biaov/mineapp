/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */
/**
 * 自定义错误处理中间件
 */
const ErrorHandles = require("./error"); // 错误处理中间件
const NotFounds = require("./notFound"); // 404中间件
/**
 * 使用扩展运算符，不会存在命名冲突
 */
module.exports = { ...ErrorHandles, ...NotFounds };
