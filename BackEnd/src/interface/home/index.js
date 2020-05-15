/**
 * 首页模块
 */
const { BaseUrl } = require("./config");
const { pool, router, YES } = $api.Require("utils");

// 轮播图
router.get(BaseUrl + "carousel", (req, res) => {
  let sql = "SELECT icid,href FROM ma_index_carousel";
  pool.query(sql, (error, result) => {
    if (error) throw error;
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: { list: result } });
  });
});