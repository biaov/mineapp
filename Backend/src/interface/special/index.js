/**
 * 特效模块
 */
const { BaseUrl } = require("./config");
const { pool, router, YES } = $api.Require("utils");
const { Valid: { Public: { Pager } } } = $api.Require("middleware");

// 特效列表
router.get(BaseUrl + "specialList", [Pager], (req, res) => {
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
});