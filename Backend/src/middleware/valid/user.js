/**
 * 账户管理模块验证
 */

/**
 * 验证修改用户信息
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const EditUserInfo = (req, res, next) => {
  $api.PostArg(req).then(data => {
    const { nickname, avatar, sex, signature } = data; // 接收参数
    let sql, type;
    // 判断用户名是否存在
    if (!!nickname) {
      sql = "UPDATE ma_details_user SET nickname=? WHERE userId=?";
      type = nickname;
    } else if (!!avatar) { // 判断头像是否存在
      sql = "UPDATE ma_details_user SET avatar=? WHERE userId=?";
      type = avatar;
    } else if (sex === 0 || sex === 1) { // 判断性别是否存在
      sql = "UPDATE ma_details_user SET sex=? WHERE userId=?";
      type = sex;
    } else if (!!signature) { // 判断签名是否存在
      sql = "UPDATE ma_details_user SET signature=? WHERE userId=?";
      type = signature;
    } else {
      $api.ReturnJson(res);
      return;
    }
    req.validData = $api.SaveValidData(req.validData, { sql, type }); // 保存验证对象
    next(); // 验证通过
  });
}
/**
 * 验证修改密码
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const EditPwd = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ opassword, password, cpassword }) => {
    // 判断手机号和密码是否符合相应格式
    if (!PwdReg.test(opassword) || !PwdReg.test(password)) {
      $api.ReturnJson(res, { msg: "手机号或密码格式错误" });
    } else if (password === opassword) {
      $api.ReturnJson(res, { msg: "新密码和原密码不能一样" });
    } else if (password !== cpassword) { // 判断两次密码是否一致
      $api.ReturnJson(res, { msg: "两次密码不一致" });
    } else {
      req.validData = $api.SaveValidData(req.validData, { opassword, password }); // 保存验证对象
      next(); // 验证通过
    }
  });
}

/**
 * 验证用户笔记提交
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const NoteSubmit = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ title, content }) => {
    // 判断参数是否为字符串
    if (Object.prototype.toString.call(title) !== "[object String]" || Object.prototype.toString.call(content) !== "[object String]") {
      $api.ReturnJson(res);
    } else if (!title.trim() || !content.trim()) { // 判断参数是否为空
      $api.ReturnJson(res, { msg: "标题或内容不能为空" });
    } else {
      req.validData = $api.SaveValidData(req.validData, { title, content, createTime: new Date() }); // 保存验证对象
      next(); // 验证通过
    }
  });
}

module.exports = {
  EditUserInfo, // 验证修改用户信息验证
  EditPwd, // 验证修改密码
  NoteSubmit // 验证用户笔记提交
};