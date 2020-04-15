/**
 * 账户管理模块
 */
const { BaseUrl } = require("./config");
const { PostArg, AseEnDecode, RandomAvatar, pool, router, YES, NO } = require("../../utils");

// 登录
router.post(BaseUrl + "login", (req, res) => {
  // POST接收参数
  PostArg(req).then(data => {
    const { mobile, password } = data; // 接收参数
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    let sql = "SELECT luid FROM ma_list_user WHERE mobile=? AND password=md5(?)";
    pool.query(sql, [mobile, password], (error, result) => {
      if (error) throw error;
      // 判断是否查询到信息
      if (result.length === 0) {
        obj.code = NO;
        obj.msg = "手机号或密码错误";
      } else {
        obj.code = YES;
        obj.msg = "恭喜您登陆成功";
        obj.data = {
          token: AseEnDecode({ sessionId: req.session.id, userId: result[0].luid }),
          mobile
        };
      }
      res.json(obj);
    });
  });
});

// 注册
router.post(BaseUrl + "register", (req, res) => {
  // POST接收参数
  PostArg(req).then(data => {
    const { mobile, password, cpassword } = data; // 接收参数
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    // 判断密码是否一致
    if (password !== cpassword) {
      obj.code = NO;
      obj.msg = "两次密码不一致";
      res.json(obj);
    } else {
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
              obj.code = NO;
              obj.msg = "注册失败";
              res.json(obj);
            } else {
              // 查询新增用户的账号id
              sql = "SELECT luid FROM ma_list_user WHERE mobile=? AND password=md5(?)";
              pool.query(sql, [mobile, password], (error, result3) => {
                if (error) throw error;
                // 判断是否查询到信息
                if (result3.length === 0) {
                  obj.code = NO;
                  obj.msg = "注册失败";
                  res.json(obj);
                } else {
                  // 新增用户信息,关联用户账号id
                  sql = "INSERT INTO ma_details_user(duid, nickname, avatar, sex, signature, userId) VALUES (NULL,?,?,?,?,?)";
                  const defaultAvatar = RandomAvatar(); // 获取随机默认头像
                  pool.query(sql, ["", defaultAvatar, 0, "", result3[0].luid], (error, result4) => {
                    if (error) throw error;
                    if (result4.affectedRows === 0) {
                      obj.code = NO;
                      obj.msg = "注册失败";
                    } else {
                      obj.code = YES;
                      obj.msg = "注册成功";
                    }
                    res.json(obj);
                  });
                }
              });
            }
          });
        } else {
          obj.code = NO;
          obj.msg = "手机号已存在";
          res.json(obj);
        }
      });
    }
  });
});

// 忘记密码
router.post(BaseUrl + "forget", (req, res) => {
  // POST接收参数
  PostArg(req).then(data => {
    const { mobile, password, cpassword } = data; // 接收参数
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    if (password !== cpassword) {
      obj.code = NO;
      obj.msg = "两次密码不一致";
      res.json(obj);
    } else {
      let sql = "UPDATE ma_list_user SET password=md5(?) WHERE mobile=?";
      pool.query(sql, [password, mobile], (error, result) => {
        if (error) throw error;
        // 判断是否修改成功
        if (result.affectedRows === 0) {
          obj.code = NO;
          obj.msg = "修改失败";
        } else {
          obj.code = YES;
          obj.msg = "修改成功";
        };
        res.json(obj);
      });
    }
  });
});