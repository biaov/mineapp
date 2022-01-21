/**
 * 错误处理模块
 */
const { ErrorCode } = $api.Require("utils");
/**
 * 程序运行错误处理
 * @param {Object} error - 错误对象
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const ErrorHandle = (error, req, res, next) => {
  if (error) {
    $api.ReturnJson(res, { code: ErrorCode, msg: `${error || "服务器错误"}`, data: null });
  } else {
    next();
  }
};

module.exports = {
  ErrorHandle // 程序运行错误处理
};
