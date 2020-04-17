/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */

(function(global) {
  const path = require("path"); // 引入路径模块
  const { PublicPath, NO } = require("./variable"); // 引入全局变量
  const crypto = require("crypto"); // 引入crypto模块

  /**
   * 时间转换
   * @param {String|Date} time - 时间格式
   * @returns {String}
   */
  const Format = time => {
    let t = new Date(time); // 创建Date对象
    let Y = t.getFullYear(); // 年
    let M = t.getMonth() + 1; // 月
    let D = t.getDate(); // 日
    let h = t.getHours(); // 时
    let m = t.getMinutes(); // 分
    let s = t.getSeconds(); // 秒
    M = M < 10 ? "0" + M : M;
    D = D < 10 ? "0" + D : D;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
  }

  /**
   * POST请求接收参数
   * @param {Object} req - 请求对象
   * @returns {Object} - Promise Object
   */
  const PostArg = req => {
    return new Promise(resolve => {
      let data = "";
      //注册data事件接收数据
      req.on("data", chunk => {
        // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
        data += chunk;
      });
      req.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
  }

  /**
   * 加密,解密
   * @param {Object} data - 需要加密的数据
   * @param {Boolean|undefined} [type=false] - 判断是加密还是解密，type：true为解密，false为加密
   * @param {String} [password=123456] - 加密数据的密码
   * @returns {String|Object} - 返回加密，解密结果
   */
  const AseEnDecode = (data, type = false, password = "123456") => {
    // 判断是加密还是解密，type：true为解密，false为加密
    if (!type) { // 加密
      if (Object.prototype.toString.call(data) !== "[object Object]") throw new Error(data + "is not Object");
      data = JSON.stringify(data);
      // 创建cipher对象
      const cipher = crypto.createCipher("aes192", password);
      // 指定被加密的数据
      let crypted = cipher.update(data, "utf-8", "hex");
      crypted += cipher.final("hex");
      return crypted.toString();
    } else { // 解密
      if (Object.prototype.toString.call(data) !== "[object String]") throw new Error(data + "is not String");
      // 创建 decipher对象
      const decipher = crypto.createDecipher("aes192", password);
      // 指定需要被解密的数据
      let decrypted = decipher.update(data, "hex", "utf-8");
      decrypted += decipher.final("utf-8");
      return JSON.parse(decrypted);
    }
  }

  /**
   * 获取随机默认头像
   * @returns {String} - 头像地址
   */
  const RandomAvatar = () => {
    const randomNum = Math.ceil(Math.random() * (8 - 1)) + 1;
    return PublicPath + "images/avatar/default/" + randomNum + ".png";
  }

  /**
   * 分页参数转化成数字
   * @param {Any} requireNum - 需要转化的数字
   * @param {Number} defaultNum - 默认值
   * @returns {Number} - 转化后的数字
   */
  const ConvertNum = (requireNum, defaultNum) => {
    // 判断defaultNum是否为数字
    if (Object.prototype.toString.call(defaultNum) === "[object Number]") {
      // 防止requireNum为undefined,负数,小数,NaN
      // Math.abs是为了防止传递负数，parseInt是把传递的数据转为数字或者NaN，||短路逻辑为了防止NaN
      return Math.abs(parseInt(requireNum)) || defaultNum;
    } else {
      throw new Error(`${defaultNum} is not number`);
    }
  }

  /**
   * 验证token是否正确
   * @param {String} token - token值
   * @returns {Object} - Promise Object
   */
  const VerifyToken = (token, res) => {
    return new Promise(resolve => {
      // 返回token错误
      function TokenError(res) {
        res.json({ code: NO, msg: "token错误", data: null }); // 返回前端数据
      }
      // 判断token是否传递
      if (Object.prototype.toString.call(token) === "[object String]" && token.trim().length !== 0) {
        const { userId } = AseEnDecode(token, true);
        // 判断是否存在userId
        if (!userId) {
          TokenError(res);
        } else {
          resolve(userId);
        }
      } else {
        TokenError(res);
      }
    });
  }

  /**
   * 设置require src路径
   * @param {String} url - src下的路径
   * @returns {Any} - 引入的模块
   */
  const Require = url => require(path.resolve(process.cwd(), "src/" + url));

  /**
   * 返回响应JSON数据
   * @param {Object} res - 响应对象
   * @param {Object} [obj={}] - json对象
   */
  const ReturnJson = (res, obj = {}) => {
    let { code = NO, msg = "参数错误", data = null } = obj;
    res.json({ code, msg, data });
  };
  /**
   * 保存验证对象数据
   * @param {Any} - 需要改变的值
   * @param {Object} [obj={}] - 需要添加的对象
   * @returns {Object} - 返回一个对象
   */
  const SaveValidData = (validData, obj = {}) => {
    // 获取一个新对象
    let value = Object.prototype.toString.call(validData) === "[object Object]" ? validData : {};
    // 循环遍历把需要保存的值放到新对象中去
    for (const key in obj) {
      value[key] = obj[key];
    }
    return value;
  }
  global.$api = {
    Format, // 时间转换
    PostArg, // POST请求接收参数
    AseEnDecode, // 加密,解密
    RandomAvatar, // 获取随机默认头像
    ConvertNum, // 分页参数转化成数字
    VerifyToken, // token验证
    Require, // 设置require src路径
    ReturnJson, // 返回响应JSON数据
    SaveValidData // 保存验证对象数据
  }
})(global);