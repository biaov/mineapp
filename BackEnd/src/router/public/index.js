/**
 * 公共模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { VaPager, VaDetails, VaVerifyToken } = require("@/middleware/valid/public"); // 校验
const { CoVersionInfo, CoRandomName, CoUploadImg, CoNoticeList, CoNoticeDetails, CoHelpList, CoHelpDetails } = require("@/controller/public"); // 控制器

router.get(BaseUrl + "versionInfo", CoVersionInfo); // APP Version信息
router.get(BaseUrl + "randomName", CoRandomName); // 随机生成名称
router.post(BaseUrl + "uploadImg", [VaVerifyToken], CoUploadImg); // 上传图片
router.get(BaseUrl + "noticeList", CoNoticeList); // 公告列表
router.get(BaseUrl + "noticeDetails", [VaDetails], CoNoticeDetails); // 公告详情
router.get(BaseUrl + "helpList", [VaPager], CoHelpList); // 帮助中心列表
router.get(BaseUrl + "helpDetails", [VaDetails], CoHelpDetails); // 帮助中心详情
