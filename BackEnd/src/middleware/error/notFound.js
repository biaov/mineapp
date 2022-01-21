/**
 * 404处理模块
 */
// const { NoFoundCode } = $api.Require("utils");
const { NoFoundCode } = $api.Require("utils");

/**
 * 404错误处理
 * @param {Object} error - 错误对象
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const NoFound = (req, res, next) => {
  $api.ReturnJson(res, { code: NoFoundCode, msg: "API接口路径或请求方法错误", data: null });
};

module.exports = {
  NoFound // 404错误处理
};
