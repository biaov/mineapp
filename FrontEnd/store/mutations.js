const mutations = {
  // 设置用户信息
  SET_USERINFO: (state, value) => {
    state.isLogin = true; // 修改为已登录状态
    state.userInfo = value;
    // 保存用户信息到本地缓存
    uni.setStorage({
      key: "userInfo",
      data: value
    });
  },
  // 退出登录
  SET_LOGOUT: state => {
    state.isLogin = false; // 去掉登录状态
    state.userInfo = {};
    // 删除本地缓存用户信息
    uni.removeStorage({
      key: "userInfo"
    });
  },
  // 设置验证码
  SET_VERIFYCODE: (state, value) => {
    state.verifyCode = value;
  }
};
export default mutations;