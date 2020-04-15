/**
 * 公共模块
 */
const { BaseUrl } = require("./config");
const { Format, PublicPath, VerifyToken, ConvertNum, pool, router, fs, multiparty, RandomName, YES, NO } = require("../../utils");
const imgPath = "images/upload/";
// APP version信息
router.get(BaseUrl + "versionInfo", (req, res) => {
  let obj = { code: YES, msg: "查询成功", data: {} }; // 声明返回对象
  obj.code = YES;
  obj.data = {
    version: "1.0.0",
    downUrl: PublicPath + "update/update.wgt"
  };
  res.json(obj);
});

// 随机生成名称
router.get(BaseUrl + "randomName", (req, res) => {
  let obj = { code: YES, msg: "查询成功", data: {} }; // 声明返回对象
  obj.code = YES;
  obj.data = {
    randomName: RandomName.generate() // 随机生成名称
  };
  res.json(obj);
});

// 上传图片
router.post(BaseUrl + "uploadImg", (req, res) => {
  const { token } = req.headers; // 接收token
  VerifyToken(token, res).then(() => {
    let obj = { code: null, msg: "", data: null }; // 声明返回对象
    // 接收参数
    let form = new multiparty.Form();
    // 设置文件存储路径
    form.uploadDir = "../" + imgPath; // 上线
    // form.uploadDir = "online/images/upload/"; // 本地
    // 设置单文件大小设置
    form.maxFilesSize = 2 * 1024 * 1024;
    // 上传完后处理
    form.parse(req, function(error, fields, files) {
      if (files == undefined) {
        obj.code = NO;
        obj.msg = "图片上传失败，请重新上传";
        res.json(obj);
      } else {
        files = files.file[0];
        if (files.size > form.maxFilesSize || files.size == undefined) {
          obj.code = NO;
          obj.msg = "图片过大，请上传小于2M的图片";
          res.json(obj);
        } else {
          let time = new Date().getTime();
          let avatarName = time + ".png";
          let newPath = form.uploadDir + avatarName;
          fs.renameSync(files.path, newPath); //重命名
          obj.code = YES;
          obj.msg = "上传成功";
          obj.data = {
            url: PublicPath + imgPath + avatarName
          };
          res.json(obj); // 返回数据
        };
      }
    });
  });
});

// 公告列表
router.get(BaseUrl + "noticeList", (req, res) => {
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let sql = "SELECT dnid,title,createTime FROM ma_details_notice";
  pool.query(sql, [], (error, result) => {
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
      obj.data = {
        list: result
      };
    }
    res.json(obj);
  });
});

// 公告详情
router.get(BaseUrl + "noticeDetails", (req, res) => {
  const { id } = req.query;
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let sql = "SELECT title,createTime,content FROM ma_details_notice WHERE dnid=?";
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

// 帮助中心列表
router.get(BaseUrl + "helpList", (req, res) => {
  let { current, count } = req.query; // 拿取参数
  current = ConvertNum(current, 1); // 当前第几页
  count = ConvertNum(count, 10); // 分页数量
  let start = (current - 1) * count; // 开始下标
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let sql = "SELECT dqid,title,createTime FROM ma_details_question LIMIT ?,?";
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

// 帮助中心详情
router.get(BaseUrl + "helpDetails", (req, res) => {
  const { id } = req.query;
  let obj = { code: null, msg: "", data: null }; // 声明返回对象
  let sql = "SELECT title,createTime,content FROM ma_details_question WHERE dqid=?";
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