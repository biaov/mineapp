/**
 * 特效模块控制器
 */
const { pool, YES } = require("@/utils");
/**
 * 特效列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoSpecialList = (req, res) => {
  let sql = "SELECT title,src,createTime,href FROM ma_list_special LIMIT ?,?";
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
module.exports = {
  CoSpecialList // 特效列表
};
