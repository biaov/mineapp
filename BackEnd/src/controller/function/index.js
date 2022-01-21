/**
 * 功能模块控制器
 */
const { pool, YES } = require("@/utils");

/**
 * 图片预览列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoPicture = (req, res) => {
  let sql = "SELECT src FROM ma_list_picture LIMIT ?,?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: { list: result } });
  });
};
module.exports = {
  CoPicture // 图片预览列表
};
