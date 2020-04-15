<script>
import { mapActions } from "vuex";
export default {
  onLaunch: function() {
    this.network();
    this.updateLogin();
  },
  onShow: function() {
    // console.log("App Show");
  },
  onHide: function() {
    // console.log("App Hide");
  },
  methods: {
    ...mapActions(["Login"]),
    // 监听网络状态
    network() {
      // APP打开获取网络状态
      uni.getNetworkType({
        success: res => {
          res.networkType == "none" && this.$api.msg("网络连接不可用,请稍后重试");
        }
      });
    },
    // 更新登录状态
    updateLogin() {
      // 获取本地缓存里的用户信息
      uni.getStorage({
        key: "userInfo",
        success: res => {
          const { data } = res;
          // 如果本地存在登录信息,则保存登录信息到vuex里去
          !!data && this.Login(data);
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 基础样式 */
@import "@/utils/styles/index.scss";
</style>
