require("./function");
const Init = require("./init");
const Var = require("./variable");
/**
 * 使用扩展运算符，不会存在命名冲突
 */
module.exports = { ...Init, ...Var };