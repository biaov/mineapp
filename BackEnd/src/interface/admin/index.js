/**
 * 账户管理模块
 */
const { BaseUrl } = require("./config");
const { pool, router, YES } = $api.Require("utils");
const { Valid: { Admin: { Login, Register } } } = $api.Require("middleware");

// 登录
router.post(BaseUrl + "login", [Login], (req, res) => {
  let sql = "SELECT luid FROM ma_list_user WHERE mobile=? AND password=md5(?)";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    (result.length === 0) ? $api.ReturnJson(res, { msg: "手机号或密码错误" }) : $api.ReturnJson(res, {
      code: YES,
      msg: "恭喜您登陆成功",
      data: { token: $api.AseEnDecode({ sessionId: req.session.id, userId: result[0].luid }) }
    });
  });
});

// 注册
router.post(BaseUrl + "register", [Register], (req, res) => {
  const { mobile, password } = req.validData; // 验证后数据
  // 查询用户是否已存在
  let sql = "SELECT luid FROM ma_list_user WHERE mobile=?";
  pool.query(sql, [mobile], (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    if (result.length === 0) {
      // 新增用户账号信息
      sql = "INSERT INTO ma_list_user(luid,mobile,password) VALUES (NULL,?,md5(?))";
      pool.query(sql, [mobile, password], (error, result2) => {
        if (error) throw error;
        // 判断是否改变信息
        if (result2.affectedRows === 0) {
          $api.ReturnJson(res, { msg: "注册失败" });
        } else {
          // 查询新增用户的账号id
          sql = "SELECT luid FROM ma_list_user WHERE mobile=? AND password=md5(?)";
          pool.query(sql, [mobile, password], (error, result3) => {
            if (error) throw error;
            // 判断是否查询到信息
            if (result3.length === 0) {
              $api.ReturnJson(res, { msg: "注册失败" });
            } else {
              // 新增用户信息,关联用户账号id
              sql = "INSERT INTO ma_details_user(duid, nickname, avatar, sex, signature, userId) VALUES (NULL,?,?,?,?,?)";
              const defaultAvatar = $api.RandomAvatar(); // 获取随机默认头像
              pool.query(sql, ["", defaultAvatar, 0, "", result3[0].luid], (error, result4) => {
                if (error) throw error;
                if (result4.affectedRows === 0) {
                  $api.ReturnJson(res, { msg: "注册失败" });
                } else {
                  $api.ReturnJson(res, { code: YES, msg: "注册成功" });
                }
              });
            }
          });
        }
      });
    } else {
      $api.ReturnJson(res, { msg: "手机号已存在" });
    }
  });
});

// 忘记密码
router.post(BaseUrl + "forget", [Register], (req, res) => {
  const { mobile, password } = req.validData;
  let sql = "UPDATE ma_list_user SET password=md5(?) WHERE mobile=?";
  pool.query(sql, [password, mobile], (error, result) => {
    if (error) throw error;
    // 判断是否修改成功
    (result.affectedRows === 0) ? $api.ReturnJson(res, { msg: "修改失败" }) : $api.ReturnJson(res, { code: YES, msg: "修改成功" })
  });
});