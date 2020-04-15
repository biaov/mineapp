/**
 * 用户模块
 */
const { BaseUrl } = require("./config");
const { Format, VerifyToken, ConvertNum, PostArg, pool, router, YES, NO } = require("../../utils");

// 用户信息
router.get(BaseUrl + "userInfo", (req, res) => {
  const { token } = req.headers; // 接收token
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  VerifyToken(token, res).then(userId => {
    let sql = "SELECT nickname,avatar,sex,signature FROM ma_details_user WHERE userId=?";
    pool.query(sql, [userId], (error, result) => {
      if (error) throw error;
      // 判断是否查询到信息
      if (result.length === 0) {
        obj.code = NO;
        obj.msg = "查询失败";
      } else {
        obj.code = YES;
        obj.msg = "查询成功";
        obj.data = result[0];
      }
      res.json(obj);
    });
  });
});

// 修改用户信息(昵称、头像、性别、签名)
router.post(BaseUrl + "editInfo", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    // POST接收参数
    PostArg(req).then(data => {
      const { nickname, avatar, sex, signature } = data; // 接收参数
      let obj = { code: null, msg: "", data: null }; // 声明返回对象
      let sql = "";
      let type = "";
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
        obj.code = NO;
        obj.msg = "参数错误";
        res.json(obj);
        return;
      }
      pool.query(sql, [type, userId], (error, result) => {
        if (error) throw error;
        // 判断是否改变信息
        if (result.affectedRows === 0) {
          obj.code = NO;
          obj.msg = "修改失败";
        } else {
          obj.code = YES;
          obj.msg = "修改成功";
        }
        res.json(obj);
      });
    });
  });

});

// 修改密码
router.post(BaseUrl + "editPwd", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    // POST接收参数
    PostArg(req).then(data => {
      const { opassword, password, cpassword } = data; // 接收参数
      let obj = { code: null, msg: "", data: null }; // 声明返回对象
      if (password !== cpassword) {
        obj.code = NO;
        obj.msg = "两次密码不一致";
        res.json(obj);
      } else {
        let sql = "SELECT mobile FROM ma_list_user WHERE luid=? AND password=md5(?)";
        pool.query(sql, [userId, opassword], (error, result) => {
          if (error) throw error;
          // 判断是否改变信息
          if (result.length === 0) {
            obj.code = NO;
            obj.msg = "原密码错误";
            res.json(obj);
          } else {
            sql = "UPDATE ma_list_user SET password=md5(?) WHERE luid=?";
            pool.query(sql, [password, userId], (error, result) => {
              if (error) throw error;
              // 判断是否改变信息
              if (result.affectedRows === 0) {
                obj.code = NO;
                obj.msg = "修改失败";
              } else {
                obj.code = YES;
                obj.msg = "修改成功";
              }
              res.json(obj);
            });
          }
        });
      }
    });
  });
});

// 用户笔记列表
router.get(BaseUrl + "noteList", (req, res) => {
  const { token } = req.headers; // 接收token
  let { current, count } = req.query; // 拿取参数
  current = ConvertNum(current, 1); // 当前第几页
  count = ConvertNum(count, 10); // 分页数量
  let start = (current - 1) * count; // 开始下标
  VerifyToken(token, res).then(userId => {
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    let sql = "SELECT dnid,title,createTime FROM ma_details_note WHERE userId=? LIMIT ?,?";
    pool.query(sql, [userId, start, count], (error, result) => {
      if (error) throw error;
      // 判断查询到数据是否为空
      if (result.length !== 0) {
        // 转化时间
        result.forEach(elem => {
          elem.createTime = Format(elem.createTime);
        });
      }
      obj.code = YES;
      obj.msg = "查询成功";
      obj.data = {
        list: result
      };
      res.json(obj);
    });
  });
});

// 删除用户笔记列表
router.post(BaseUrl + "noteDelete", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    // POST接收参数
    PostArg(req).then(data => {
      const { ids } = data; // 接收参数
      let obj = { code: null, msg: "", data: null }; // 声明返回对象
      if (ids.length === 0) {
        obj.code = NO;
        obj.msg = "参数不能为空";
        res.json(obj);
      } else {
        // 防止sql注入
        ids.forEach((elem, i, arr) => {
          arr[i] = parseInt(elem);
        });
        let sql = `DELETE FROM ma_details_note WHERE userID=? AND dnid in (${ids.toString()})`;
        pool.query(sql, [userId], (error, result) => {
          if (error) throw error;
          // 判断是否改变信息
          if (result.affectedRows === 0) {
            obj.code = NO;
            obj.msg = "删除失败";
          } else {
            obj.code = YES;
            obj.msg = "删除成功";
          }
          res.json(obj);
        });
      }
    });
  });
});

// 用户笔记详情
router.get(BaseUrl + "noteDetails", (req, res) => {
  const { id } = req.query;
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    let sql = "SELECT title,createTime,content FROM ma_details_note WHERE userId=? AND dnid=?";
    pool.query(sql, [userId, id], (error, result) => {
      if (error) throw error;
      // 判断是否查询到信息
      if (result.length === 0) {
        obj.code = NO;
        obj.msg = "查询失败";
      } else {
        // 转化时间
        result.forEach(elem => {
          elem.createTime = Format(elem.createTime);
        });
        obj.code = YES;
        obj.msg = "查询成功";
        obj.data = result[0];
      }
      res.json(obj);
    });
  });
});

// 用户笔记提交
router.post(BaseUrl + "noteSubmit", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    // POST接收参数
    PostArg(req).then(data => {
      const { title, content } = data; // 接收参数
      let obj = { code: null, msg: "", data: null }; // 声明返回对象
      let createTime = new Date();
      let sql = `INSERT INTO ma_details_note(dnid, title, createTime, content, userId) VALUES ( NULL, ?, ?, ?, ?)`;
      pool.query(sql, [title, createTime, content, userId], (error, result) => {
        if (error) throw error;
        // 判断是否改变信息
        if (result.affectedRows === 0) {
          obj.code = YES;
          obj.msg = "提交失败";
        } else {
          obj.code = YES;
          obj.msg = "提交成功";
        };
        res.json(obj);
      });

    });
  });
});

// 我的反馈
router.get(BaseUrl + "feedbackList", (req, res) => {
  const { token } = req.headers; // 接收token
  let { current, count } = req.query; // 拿取参数
  current = ConvertNum(current, 1); // 当前第几页
  count = ConvertNum(count, 10); // 分页数量
  let start = (current - 1) * count; // 开始下标
  VerifyToken(token, res).then(userId => {
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    let sql = "SELECT dfid,title,createTime FROM ma_details_feedback WHERE userId=? LIMIT ?,?";
    pool.query(sql, [userId, start, count], (error, result) => {
      if (error) throw error;
      // 判断查询到数据是否为空
      if (result.length !== 0) {
        // 转化时间
        result.forEach(elem => {
          elem.createTime = Format(elem.createTime);
        });
      }
      obj.code = YES;
      obj.msg = "查询成功";
      obj.data = {
        list: result
      };
      res.json(obj);
    });
  });
});

// 删除我的反馈
router.post(BaseUrl + "feedbackDelete", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    // POST接收参数
    PostArg(req).then(data => {
      const { ids } = data; // 接收参数
      let obj = { code: null, msg: "", data: null }; // 声明返回对象
      if (ids.length === 0) {
        obj.code = NO;
        obj.msg = "参数不能为空";
        res.json(obj);
      } else {
        // 防止sql注入
        ids.forEach((elem, i, arr) => {
          arr[i] = parseInt(elem);
        });
        let sql = `DELETE FROM ma_details_feedback WHERE userID=? AND dfid in (${ids.toString()})`;
        pool.query(sql, [userId], (error, result) => {
          if (error) throw error;
          // 判断是否改变信息
          if (result.affectedRows === 0) {
            obj.code = NO;
            obj.msg = "删除失败";
          } else {
            obj.code = YES;
            obj.msg = "删除成功";
          }
          res.json(obj);
        });
      }
    });
  });
});

// 我的反馈详情
router.get(BaseUrl + "feedbackDetails", (req, res) => {
  const { id } = req.query;
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    let sql = "SELECT title,createTime,content,reply FROM ma_details_feedback WHERE userId=? AND dfid=?";
    pool.query(sql, [userId, id], (error, result) => {
      if (error) throw error;
      // 判断是否查询到信息
      if (result.length === 0) {
        obj.code = NO;
        obj.msg = "查询失败";
      } else {
        // 转化时间
        result.forEach(elem => {
          elem.createTime = Format(elem.createTime);
        });
        obj.code = YES;
        obj.msg = "查询成功";
        obj.data = result[0];
      }
      res.json(obj);
    });
  });
});

// 我的反馈提交
router.post(BaseUrl + "feedbackSubmit", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(userId => {
    // POST接收参数
    PostArg(req).then(data => {
      const { title, content } = data; // 接收参数
      let obj = { code: null, msg: "", data: null }; // 声明返回对象
      let createTime = new Date();
      let sql = `INSERT INTO ma_details_feedback(dfid, title, createTime, content, reply, userId) VALUES ( NULL, ?, ?, ?, ?, ?)`;
      pool.query(sql, [title, createTime, content, null, userId], (error, result) => {
        if (error) throw error;
        // 判断是否改变信息
        if (result.affectedRows === 0) {
          obj.code = YES;
          obj.msg = "反馈失败";
        } else {
          obj.code = YES;
          obj.msg = "反馈成功";
        };
        res.json(obj);
      });

    });
  });
});