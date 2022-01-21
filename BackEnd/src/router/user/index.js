/**
 * 用户模块
 */
const { BaseUrl } = require("./config"); // 模块配置
const { router } = require("@/utils"); // 工具类
const { VaPager, VaDetails, VaVerifyToken, VaBatchDelete } = require("@/middleware/valid/public"); // 校验
const { VaEditUserInfo, VaEditPwd, VaNoteSubmit } = require("@/middleware/valid/User"); // 校验
const {
  CoUserInfo,
  CoEditInfo,
  CoEditPwd,
  CoNoteList,
  CoNoteDelete,
  CoNoteDetails,
  CoNoteSubmit,
  CoFeedbackList,
  CoFeedbackDelete,
  CoFeedbackDetails,
  CoFeedbackSubmit
} = require("@/controller/user"); // 控制器

router.get(BaseUrl + "userInfo", [VaVerifyToken], CoUserInfo); // 用户信息
router.post(BaseUrl + "editInfo", [VaVerifyToken, VaEditUserInfo], CoEditInfo); // 修改用户信息(昵称、头像、性别、签名)
router.post(BaseUrl + "editPwd", [VaVerifyToken, VaEditPwd], CoEditPwd); // 修改密码
router.get(BaseUrl + "noteList", [VaVerifyToken, VaPager], CoNoteList); // 用户笔记列表
router.post(BaseUrl + "noteDelete", [VaVerifyToken, VaBatchDelete], CoNoteDelete); // 删除用户笔记列表
router.get(BaseUrl + "noteDetails", [VaVerifyToken, VaDetails], CoNoteDetails); // 用户笔记详情
router.post(BaseUrl + "noteSubmit", [VaVerifyToken, VaNoteSubmit], CoNoteSubmit); // 用户笔记提交
router.get(BaseUrl + "feedbackList", [VaVerifyToken, VaPager], CoFeedbackList); // 我的反馈
router.post(BaseUrl + "feedbackDelete", [VaVerifyToken, VaBatchDelete], CoFeedbackDelete); // 删除我的反馈
router.get(BaseUrl + "feedbackDetails", [VaVerifyToken, VaDetails], CoFeedbackDetails); // 我的反馈详情
router.post(BaseUrl + "feedbackSubmit", [VaVerifyToken, VaNoteSubmit], CoFeedbackSubmit); // 我的反馈提交
