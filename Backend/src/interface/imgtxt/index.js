/**
 * 图文模块
 */
const { BaseUrl } = require("./config");
const { Format, ConvertNum, pool, router, YES, NO } = require("../../utils");

// 文章列表
router.get(BaseUrl + "articleList", (req, res) => {
  let { current, count } = req.query; // 拿取参数
  current = ConvertNum(current, 1); // 当前第几页
  count = ConvertNum(count, 10); // 分页数量
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let start = (current - 1) * count; // 开始下标
  let sql = "SELECT daid,title,src,createTime FROM ma_details_article LIMIT ?,?";
  pool.query(sql, [start, count], (error, result) => {
    if (error) throw error;
    // 判断查询到数据是否为空
    if (result.length !== 0) {
      // 转化时间
      result.forEach(elem => {
        elem.createTime = Format(elem.createTime);
      });
    }
    obj.code = YES;
    obj.msg = "查询成功";
    obj.data = {
      list: result
    };
    res.json(obj);
  });
});

// 文章详情
router.get(BaseUrl + "articleDetails", (req, res) => {
  const { id } = req.query;
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let sql = "SELECT title,src,createTime,content FROM ma_details_article WHERE daid=?";
  pool.query(sql, [id], (error, result) => {
    if (error) throw error;
    // 判断是否查询到信息
    if (result.length === 0) {
      obj.code = NO;
      obj.msg = "查询失败";
    } else {
      // 转化时间
      result.forEach(elem => {
        elem.createTime = Format(elem.createTime);
      });
      obj.code = YES;
      obj.msg = "查询成功";
      obj.data = result[0];
    }
    res.json(obj);
  });
});