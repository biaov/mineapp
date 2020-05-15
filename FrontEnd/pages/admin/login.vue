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
      const {
        form,
        returnBack,
        Login,
        $var: { PhoneReg, PwdReg },
        $api: { Msg, Loading, RequestMsg }
      } = this;
      const { mobile, password } = form; // form表单
      if (!PhoneReg.test(mobile)) { // 手机号校验
        Msg("手机号格式错误");
      } else if (!PwdReg.test(password)) { // 密码校验
        Msg("密码格式错误");
      } else {
        Loading();
        // 请求后台
        GoLogin(form).then(res => {
          RequestMsg(res).then(data => {
            Msg("登录成功");
            Login(data); // 保存用户信息
            // 延迟返回
            setTimeout(() => {
              returnBack();
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