const path = require("path"); // 导入path模块
const moduleAlias = require("module-alias"); // 导入module-alias模块
/**
 * 别名
 * @param {Void}
 * @returns {Void}
 */
const alias = () => {
  moduleAlias.addAliases({
    "@": path.resolve(__dirname, "../")
  });
};
module.exports = alias;
