/**
 * 图文模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { VaPager, VaDetails } = require("@/middleware/valid/public"); // 校验
const { CoArticleList, CoArticleDetails } = require("@/controller/imgtxt"); // 控制器

router.get(BaseUrl + "articleList", [VaPager], CoArticleList); // 文章列表
router.get(BaseUrl + "articleDetails", [VaDetails], CoArticleDetails); // 文章详情
