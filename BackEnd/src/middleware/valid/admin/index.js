/**
 * 账户管理模块校验
 */

const { PhoneReg, PwdReg } = require("@/utils");

/**
 * 校验登录
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const VaLogin = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ mobile, password }) => {
    // 判断手机号和密码是否符合相应格式
    if (!PhoneReg.test(mobile) || !PwdReg.test(password)) {
      $api.ReturnJson(res, { msg: "手机号或密码格式错误" });
    } else {
      req.validData = $api.SaveValidData(req.validData, { mobile, password }); // 保存校验对象
      next(); // 校验通过
    }
  });
};
/**
 * 校验注册
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const VaRegister = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ mobile, password, cpassword }) => {
    // 判断手机号和密码是否符合相应格式
    if (!PhoneReg.test(mobile) || !PwdReg.test(password)) {
      $api.ReturnJson(res, { msg: "手机号或密码格式错误" });
    } else if (password !== cpassword) {
      // 判断两次密码是否一致
      $api.ReturnJson(res, { msg: "两次密码不一致" });
    } else {
      req.validData = $api.SaveValidData(req.validData, { mobile, password }); // 保存校验对象
      next(); // 校验通过
    }
  });
};

module.exports = {
  VaLogin, // 校验登录
  VaRegister // 校验注册
};
