/**
 * 公共模块
 */
const { PublicPath, pool, fs, multiparty, YES } = require("@/utils");
const imgPath = "images/upload/";
/**
 * APP Version信息
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoVersionInfo = (req, res) => {
  const sql = "SELECT version,downUrl from ma_details_mineapp";
  pool.query(sql, (error, result) => {
    if (error) throw error;
    $api.ReturnJson(res, { code: YES, msg: "查询成功", data: result[0] });
  });
};
/**
 * 随机生成名称
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoRandomName = (req, res) => {
  $api.ReturnJson(res, {
    code: YES,
    msg: "查询成功",
    data: {
      randomName: $api.RandomName.generate() // 随机生成名称
    }
  });
};
/**
 * 上传图片
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoUploadImg = (req, res) => {
  // 接收参数
  let form = new multiparty.Form();
  // 设置文件存储路径
  form.uploadDir = "../" + imgPath; // 上线
  // form.uploadDir = "online/images/upload/"; // 本地
  // 设置单文件大小设置
  form.maxFilesSize = 2 * 1024 * 1024;
  // 上传完后处理
  form.parse(req, function (error, fields, files) {
    if (files == undefined) {
      $api.ReturnJson(res, { msg: "图片上传失败，请重新上传" });
    } else {
      files = files.file[0];
      if (files.size > form.maxFilesSize || files.size == undefined) {
        $api.ReturnJson(res, { msg: "图片过大，请上传小于2M的图片" });
      } else {
        let time = new Date().getTime();
        let avatarName = time + ".png";
        let newPath = form.uploadDir + avatarName;
        fs.renameSync(files.path, newPath); //重命名
        $api.ReturnJson(res, { code: YES, msg: "图片过大，请上传小于2M的图片", data: { url: PublicPath + imgPath + avatarName } });
      }
    }
  });
};
/**
 * 公告列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoNoticeList = (req, res) => {
  let sql = "SELECT dnid,title,createTime FROM ma_details_notice";
  pool.query(sql, (error, result) => {
    if (error) throw error;
    // 判断数据是否为空
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
 * 公告详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoNoticeDetails = (req, res) => {
  let sql = "SELECT title,createTime,content FROM ma_details_notice WHERE dnid=?";
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
      $api.ReturnJson(res, { code: YES, msg: "查询失败", data: result[0] });
    }
  });
};
/**
 * 帮助中心列表
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoHelpList = (req, res) => {
  let sql = "SELECT dqid,title,createTime FROM ma_details_question LIMIT ?,?";
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
 * 帮助中心详情
 * @param {Object} req - 请求对象
 * @param {Object} res - 返回对象
 * @returns {Void}
 */
const CoHelpDetails = (req, res) => {
  let sql = "SELECT title,createTime,content FROM ma_details_question WHERE dqid=?";
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
  CoVersionInfo, // APP Version信息
  CoRandomName, // 随机生成名称
  CoUploadImg, // 上传图片
  CoNoticeList, // 公告列表
  CoNoticeDetails, // 公告详情
  CoHelpList, // 帮助中心列表
  CoHelpDetails // 帮助中心详情
};
