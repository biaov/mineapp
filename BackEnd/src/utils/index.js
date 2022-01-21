const alias = require("./alias"); // 别名
alias();
require("./function"); // 方法
const Init = require("./init"); // 初始化
const Var = require("./variable"); // 变量
/**
 * 使用扩展运算符，不会存在命名冲突
 */
module.exports = { ...Init, ...Var };

