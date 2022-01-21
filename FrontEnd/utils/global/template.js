/**
 * 页面跳转
 * @param {String} url - 页面路径;
 * @returns {Void}
 */
const navTo = url => {
  uni.navigateTo({
    url
  })
}
/**
 * 页面返回
 * @param {void}
 * @returns {void}
 */
const returnBack = () => {
  uni.navigateBack()
}
export default {
  navTo, // 页面跳转
  returnBack
}
