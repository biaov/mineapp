/**
 * 功能模块
 */
const { BaseUrl } = require("./config");
const { pool, router, ConvertNum, YES, NO } = require("../../utils");

// 图片预览列表
router.get(BaseUrl + "picture", (req, res) => {
  let { current, count } = req.query; // 拿取参数
  current = ConvertNum(current, 1); // 当前第几页
  count = ConvertNum(count, 10); // 分页数量
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let start = (current - 1) * count; // 开始下标
  let sql = "SELECT lpid,src FROM ma_list_picture LIMIT ?,?";
  pool.query(sql, [start, count], (error, result) => {
    if (error) throw error;
    obj.code = YES;
    obj.msg = "查询成功";
    obj.data = {
      list: result
    };
    res.json(obj);
  });
});