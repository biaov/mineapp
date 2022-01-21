/**
 * 首页模块控制器
 */
const { pool, YES } =require("@/utils");
/**
 * 轮播图
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoCarousel = (req, res) => {
  let sql = "SELECT icid,href FROM ma_index_carousel";
  pool.query(sql, (error, result) => {
    if (error) throw error;
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: { list: result } });
  });
};
module.exports = {
  CoCarousel // 轮播图
};
