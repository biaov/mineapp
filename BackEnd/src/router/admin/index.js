/**
 * 账户管理模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { VaLogin, VaRegister } = require("@/middleware/valid/admin"); // 校验
const { CoLogin, CoRegister, CoForget } = require("@/controller/admin"); // 控制器

router.post(BaseUrl + "login", [VaLogin], CoLogin); // 登录
router.post(BaseUrl + "register", [VaRegister], CoRegister); // 注册
router.post(BaseUrl + "forget", [VaLogin], CoForget); // 忘记密码
