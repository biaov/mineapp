/**
 * 用户模块控制器
 */
const { pool, YES } = require("@/utils");
/**
 * 用户信息
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoUserInfo = (req, res) => {
  let sql = "SELECT mobile,nickname,avatar,sex,signature FROM ma_list_user,ma_details_user WHERE luid=userId AND userId=?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    result.length === 0 ? $api.ReturnJson(res, { msg: "查询失败" }) : $api.ReturnJson(res, { code: YES, msg: "查询成功", data: result[0] });
  });
};
/**
 * 修改用户信息(昵称、头像、性别、签名)
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoEditInfo = (req, res) => {
  const { sql, type, userId } = req.validData; // 接收验证参数
  pool.query(sql, [type, userId], (error, result) => {
    if (error) throw error;
    // 判断是否改变信息
    result.affectedRows === 0 ? $api.ReturnJson(res, { msg: "修改失败" }) : $api.ReturnJson(res, { code: YES, msg: "修改成功" });
  });
};
/**
 * 修改密码
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoEditPwd = (req, res) => {
  const { userId, opassword, password } = req.validData; // 接收验证参数
  let sql = "SELECT mobile FROM ma_list_user WHERE luid=? AND password=md5(?)";
  pool.query(sql, [userId, opassword], (error, result) => {
    if (error) throw error;
    // 判断是否改变信息
    if (result.length === 0) {
      $api.ReturnJson(res, { msg: "原密码错误" });
    } else {
      sql = "UPDATE ma_list_user SET password=md5(?) WHERE luid=?";
      pool.query(sql, [password, userId], (error, result) => {
        if (error) throw error;
        // 判断是否改变信息
        result.affectedRows === 0 ? $api.ReturnJson(res, { msg: "修改失败" }) : $api.ReturnJson(res, { code: YES, msg: "修改成功" });
      });
    }
  });
};
/**
 * 用户笔记列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoNoteList = (req, res) => {
  let sql = "SELECT dnid,title,createTime FROM ma_details_note WHERE userId=? LIMIT ?,?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    // 判断查询到数据是否为空
    if (result.length !== 0) {
      // 转化时间
      result.forEach(elem => {
        elem.createTime = $api.Format(elem.createTime);
      });
    }
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: { list: result } });
  });
};
/**
 * 删除用户笔记列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoNoteDelete = (req, res) => {
  const { userId, ids } = req.validData; // 接收验证参数
  let sql = `DELETE FROM ma_details_note WHERE userID=? AND dnid in (${ids})`;
  pool.query(sql, [userId], (error, result) => {
    if (error) throw error;
    // 判断是否改变信息
    result.affectedRows === 0 ? $api.ReturnJson(res, { msg: "删除失败" }) : $api.ReturnJson(res, { code: YES, msg: "删除成功" });
  });
};
/**
 * 用户笔记详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoNoteDetails = (req, res) => {
  let sql = "SELECT title,createTime,content FROM ma_details_note WHERE userId=? AND dnid=?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    if (result.length === 0) {
      $api.ReturnJson(res, { msg: "查询失败" });
    } else {
      // 转化时间
      result.forEach(elem => {
        elem.createTime = $api.Format(elem.createTime);
      });
      $api.ReturnJson(res, { code: YES, msg: "查询成功", data: result[0] });
    }
  });
};

/**
 * 用户笔记提交
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoNoteSubmit = (req, res) => {
  const { title, createTime, content, userId } = req.validData;
  let sql = `INSERT INTO ma_details_note(dnid, title, createTime, content, userId) VALUES ( NULL, ?, ?, ?, ?)`;
  pool.query(sql, [title, createTime, content, userId], (error, result) => {
    if (error) throw error;
    // 判断是否改变信息
    result.affectedRows === 0 ? $api.ReturnJson(res, { msg: "提交失败" }) : $api.ReturnJson(res, { code: YES, msg: "提交成功" });
  });
};

/**
 * 我的反馈列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoFeedbackList = (req, res) => {
  let sql = "SELECT dfid,title,createTime FROM ma_details_feedback WHERE userId=? LIMIT ?,?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    // 判断查询到数据是否为空
    if (result.length !== 0) {
      // 转化时间
      result.forEach(elem => {
        elem.createTime = $api.Format(elem.createTime);
      });
    }
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: { list: result } });
  });
};

/**
 * 删除我的反馈
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoFeedbackDelete = (req, res) => {
  const { userId, ids } = req.validData; // 接收验证参数
  let sql = `DELETE FROM ma_details_feedback WHERE userID=? AND dfid in (${ids})`;
  pool.query(sql, [userId], (error, result) => {
    if (error) throw error;
    // 判断是否改变信息
    result.affectedRows === 0 ? $api.ReturnJson(res, { msg: "删除失败" }) : $api.ReturnJson(res, { code: YES, msg: "删除成功" });
  });
};

/**
 * 我的反馈详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoFeedbackDetails = (req, res) => {
  let sql = "SELECT title,createTime,content,reply FROM ma_details_feedback WHERE userId=? AND dfid=?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    if (result.length === 0) {
      $api.ReturnJson(res, { msg: "查询失败" });
    } else {
      // 转化时间
      result.forEach(elem => {
        elem.createTime = $api.Format(elem.createTime);
      });
      $api.ReturnJson(res, { code: YES, msg: "查询成功", data: result[0] });
    }
  });
};

/**
 * 我的反馈提交
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoFeedbackSubmit = (req, res) => {
  const { title, createTime, content, userId } = req.validData;
  let sql = `INSERT INTO ma_details_feedback(dfid, title, createTime, content, reply, userId) VALUES ( NULL, ?, ?, ?, ?, ?)`;
  pool.query(sql, [title, createTime, content, null, userId], (error, result) => {
    if (error) throw error;
    // 判断是否改变信息
    result.affectedRows === 0 ? $api.ReturnJson(res, { msg: "反馈失败" }) : $api.ReturnJson(res, { code: YES, msg: "反馈成功" });
  });
};

module.exports = {
  CoUserInfo, // 用户信息
  CoEditInfo, // 修改用户信息(昵称、头像、性别、签名)
  CoEditPwd, // 修改密码
  CoNoteList, // 用户笔记列表
  CoNoteDelete, // 删除用户笔记列表
  CoNoteDetails, // 用户笔记详情
  CoNoteSubmit, // 用户笔记提交
  CoFeedbackList, // 我的反馈列表
  CoFeedbackDelete, // 删除我的反馈
  CoFeedbackDetails, // 我的反馈详情
  CoFeedbackSubmit // 我的反馈提交
};
