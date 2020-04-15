/**
 * 首页模块
 */
const { BaseUrl } = require("./config");
const { pool, router, YES, NO } = require("../../utils");

// 轮播图
router.get(BaseUrl + "carousel", (req, res) => {
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let sql = "SELECT icid,href FROM ma_index_carousel";
  pool.query(sql, [], (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    if (result.length === 0) {
      obj.code = NO;
      obj.msg = "查询失败";
    } else {
      obj.code = YES;
      obj.msg = "查询成功";
      obj.data = {
        list: result
      };
    }
    res.json(obj);
  });
});