/**
 * 首页模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { CoCarousel } = require("@/controller/home"); // 控制器

router.get(BaseUrl + "carousel", CoCarousel); // 轮播图
