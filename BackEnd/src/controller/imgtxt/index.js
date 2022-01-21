/**
 * 图文模块控制器
 */
const { pool, YES } = require("@/utils");
/**
 * 文章列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoArticleList = (req, res) => {
  let sql = "SELECT daid,title,src,createTime FROM ma_details_article LIMIT ?,?";
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
 * 文章详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoArticleDetails = (req, res) => {
  let sql = "SELECT title,src,createTime,content FROM ma_details_article WHERE daid=?";
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
module.exports = {
  CoArticleList, // 文章列表
  CoArticleDetails // 文章详情
};
