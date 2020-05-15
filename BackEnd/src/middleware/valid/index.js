/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */
/**
 * 自定义路由验证中间件
 */

const Admin = require("./admin"); // admin模块验证
const Function = require("./function"); // function模块验证
const Home = require("./home"); // home模块验证
const Imgtxt = require("./imgtxt"); // imgtxt模块验证
const Public = require("./public"); // public模块验证
const Special = require("./special"); // special模块验证
const User = require("./user"); // user模块验证
/**
 * 没有使用扩展运算符，防止命名冲突
 */
module.exports = { Admin, Function, Home, Imgtxt, Public, Special, User }