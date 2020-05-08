export default {
  BaseUrl: "https://app.biaov.cn/api/", // 生产环境
  // BaseUrl: "http://192.168.8.14:3100/api/", // 开发环境
  DownUrl: "http://appdown.biaov.cn/ugft", // APP下载地址
  H5Url: "http://mineapph5.app.biaov.cn/", // H5地址
  PhoneReg: /^1[3456789]\d{9}$/, // 手机匹配规则
  PwdReg: /^(?!\d+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/, // 密码匹配规则：6-12位数字+字母组成
}