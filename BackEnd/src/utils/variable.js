const Variable = {
  NODE_ENV: "development", // development:开发环境,production:生产环境
  NO: 0, // 数据返回状态-Error
  YES: 1, // 数据返回状态-Success
  ErrorCode: 500, // 程序错误状态码
  NoFoundCode: 404, // 404状态码
  PublicPath: "http://app.biaov.cn/mineapp/", // 路径前缀
  PhoneReg: /^1[3456789]\d{9}$/, // 手机匹配规则
  PwdReg: /^(?!\d+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ // 密码匹配规则：6-12位数字+字母组成
};
module.exports = Variable; // 自定义变量
