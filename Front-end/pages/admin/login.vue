<template>
  <!-- 登录 -->
  <view class="m-login">
    <view class="u-logo">
      <image src="../../static/logo2.png" mode="widthFix"></image>
    </view>
    <input-box icon="icon-phone" placeholder="请输入手机号" v-model="form.mobile"></input-box>
    <input-box type="password" icon="icon-password" placeholder="请输入密码" v-model="form.password"></input-box>
    <view class="u-forget" @tap="navTo('/pages/admin/forget')">忘记密码？</view>
    <view class="btn-default u-btn-login" @tap="onLogin">登录</view>
    <view class="u-register">还没有账号，<span @tap="navTo('/pages/admin/register')">立即注册</span></view>
  </view>
</template>
<script>
import InputBox from "@/components/InputBox";
import { GoLogin } from "@/api/admin";
import { mapActions } from "vuex";
export default {
  components: {
    InputBox
  },
  data() {
    return {
      // 表单信息
      form: {
        mobile: "", // 手机号
        password: "" // 密码
      }
    };
  },
  onLoad() {},
  methods: {
    ...mapActions(["Login"]),
    // 点击登录按钮
    onLogin() {
      const { mobile, password } = this.form; // form表单
      if (!this.$var.PhoneReg.test(mobile)) {
        this.$api.Msg("手机号格式错误");
      } else if (!this.$var.PwdReg.test(password)) {
        this.$api.Msg("密码格式错误");
      } else {
        this.$api.Loading();
        GoLogin(this.form).then(res => {
          this.$api
            .RequestMsg(res)
            .then(res => {
              this.$api.Msg("登录成功");
              this.Login(res);
              setTimeout(() => {
                this.returnBack();
              }, 500);
            });
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.m-login {
  padding: $common-padding;
  .u-logo {
    width: 120rpx;
    height: 124rpx;
    margin: 0 auto $common-padding * 1.5;
  }
  .input-box {
    margin-bottom: $common-padding;
  }
  @mixin same-height {
    height: 80rpx;
    line-height: 80rpx;
  }
  .u-forget {
    @include same-height;
    text-align: right;
    color: $common-font-color-reduce;
    font-size: $common-font-size-min;
  }
  .u-btn-login {
    margin-bottom: $common-padding * 2;
  }
  .u-register {
    @include same-height;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      @include same-height;
      display: block;
      color: $common-color;
    }
  }
}
</style>