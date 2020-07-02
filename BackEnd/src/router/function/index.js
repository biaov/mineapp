/**
 * 功能模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { VaPager } = require("@/middleware/valid/public"); // 校验
const { CoPicture } = require("@/controller/function"); // 控制器

router.get(BaseUrl + "picture", [VaPager], CoPicture); // 图片预览列表
