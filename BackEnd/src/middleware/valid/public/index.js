/**
 * 公共验证
 */
/**
 * 验证分页
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const VaPager = (req, res, next) => {
  let { current, count } = req.query; // 拿取参数
  current = $api.ConvertNum(current, 1); // 当前第几页
  count = $api.ConvertNum(count, 10); // 分页数量
  let start = (current - 1) * count; // 开始下标
  req.validData = $api.SaveValidData(req.validData, { start, count }); // 保存验证对象
  next(); // 验证通过
};
/**
 * 验证详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const VaDetails = (req, res, next) => {
  const { id } = req.query;
  if (!!parseInt(id)) {
    req.validData = $api.SaveValidData(req.validData, { id }); // 保存验证对象
    next(); // 验证通过
  } else {
    $api.ReturnJson(res);
  }
};
/**
 * 验证Token
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const VaVerifyToken = (req, res, next) => {
  const { token } = req.headers; // 接收token
  $api.VerifyToken(token, res).then(userId => {
    req.validData = $api.SaveValidData(req.validData, { userId }); // 保存验证对象
    next(); // 验证通过
  });
};

/**
 * 验证批量删除列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一步函数
 * @returns {Void}
 */
const VaBatchDelete = (req, res, next) => {
  // POST接收参数
  $api.PostArg(req).then(({ ids }) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      $api.ReturnJson(res);
    } else {
      // 防止sql注入
      ids.forEach((elem, i, arr) => {
        arr[i] = parseInt(elem);
      });
      req.validData = $api.SaveValidData(req.validData, { ids: ids.toString() }); // 保存验证对象
      next(); // 验证通过
    }
  });
};

module.exports = {
  VaPager, // 验证分页
  VaDetails, // 验证详情
  VaVerifyToken, // 验证Token
  VaBatchDelete // 验证批量删除列表
};
