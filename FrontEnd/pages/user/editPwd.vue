<template>
  <!-- 修改密码 -->
  <view class="m-edit-pwd">
    <input-box type="password" icon="icon-password" placeholder="请输入原密码" v-model="form.opassword"></input-box>
    <input-box type="password" icon="icon-password" placeholder="请输入6-12位数字+字母" v-model="form.password"></input-box>
    <input-box type="password" icon="icon-password" placeholder="请输入确认密码" v-model="form.cpassword"></input-box>
    <view class="btn-default u-btn-edit" @tap="onEditPwd">确定</view>
  </view>
</template>
<script>
import InputBox from "@/components/InputBox";
import VerifyCode from "@/components/InputBox/VerifyCode";
import { GoEditPwd } from "@/api/user";
export default {
  components: {
    InputBox,
    VerifyCode
  },
  data() {
    return {
      // 表单信息
      form: {
        opassword: "", // 原密码
        password: "", // 新密码
        cpassword: "" // 确认密码
      }
    };
  },
  onLoad() {},
  methods: {
    // 点击确定按钮
    onEditPwd() {
      const {
        form,
        returnBack,
        $var: { PwdReg },
        $api: { Msg, Loading, RequestMsg }
      } = this;
      const { opassword, password, cpassword } = form; // form表单
      if (!PwdReg.test(opassword)) {
        // 原密码校验
        Msg("原密码格式错误");
      } else if (!PwdReg.test(password)) {
        // 新密码校验
        Msg("新密码格式错误");
      } else if (cpassword !== password) {
        // 重复密码校验
        Msg("两次密码不一致");
      } else {
        Loading();
        // 请求后台
        GoEditPwd(form).then(res => {
          RequestMsg(res).then(res => {
            Msg("修改密码成功");
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
.m-edit-pwd {
  padding: $common-padding;
  @mixin same-height {
    height: 80rpx;
    line-height: 80rpx;
  }
  .u-btn-edit {
    margin-bottom: $common-padding * 2;
  }
}
</style>