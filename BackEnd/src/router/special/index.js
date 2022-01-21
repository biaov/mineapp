/**
 * 特效模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { VaPager } = require("@/middleware/valid/public"); // 校验
const { CoSpecialList } = require("@/controller/special"); // 控制器

router.get(BaseUrl + "specialList", [VaPager], CoSpecialList); // 特效列表
