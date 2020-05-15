/**
 * 账户管理模块验证
 */

const { PhoneReg, PwdReg } = $api.Require("utils");

/**
 * 验证登录
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const Login = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ mobile, password }) => {
    // 判断手机号和密码是否符合相应格式
    if (!PhoneReg.test(mobile) || !PwdReg.test(password)) {
      $api.ReturnJson(res, { msg: "手机号或密码格式错误" });
    } else {
      req.validData = $api.SaveValidData(req.validData, { mobile, password }); // 保存验证对象
      next(); // 验证通过
    }
  });
}
/**
 * 验证注册
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const Register = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ mobile, password, cpassword }) => {
    // 判断手机号和密码是否符合相应格式
    if (!PhoneReg.test(mobile) || !PwdReg.test(password)) {
      $api.ReturnJson(res, { msg: "手机号或密码格式错误" });
    } else if (password !== cpassword) { // 判断两次密码是否一致
      $api.ReturnJson(res, { msg: "两次密码不一致" });
    } else {
      req.validData = $api.SaveValidData(req.validData, { mobile, password }); // 保存验证对象
      next(); // 验证通过
    }
  });
}


module.exports = {
  Login, // 验证登录
  Register // 验证注册
};