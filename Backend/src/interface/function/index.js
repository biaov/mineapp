/**
 * 功能模块
 */
const { BaseUrl } = require("./config");
const { pool, router, YES } = $api.Require("utils");
const { Valid: { Public: { Pager } } } = $api.Require("middleware");
// 图片预览列表
router.get(BaseUrl + "picture", [Pager], (req, res) => {
  let sql = "SELECT src FROM ma_list_picture LIMIT ?,?";
  pool.query(sql, Object.values(req.validData), (error, result) => {
    if (error) throw error;
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: { list: result } });
  });
});