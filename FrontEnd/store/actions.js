const actions = {
  // 登录
  Login({ commit }, value) {
    commit("SET_USERINFO", value);
  },
  // 退出登录
  Logout({ commit }) {
    commit("SET_LOGOUT");
  },
  // 验证码
  VerifyCode({ commit }, value) {
    commit("SET_VERIFYCODE", value);
  }
}
export default actions;