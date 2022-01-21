<template>
  <!-- 忘记密码 -->
  <view class="m-forget">
    <input-box icon="icon-phone" placeholder="请输入手机号" v-model="form.mobile"></input-box>
    <verify-code icon="icon-yanzhengma1" placeholder="请输入验证码" v-model="form.verifyCode"></verify-code>
    <input-box type="password" icon="icon-password" placeholder="请输入6-12位数字+字母" v-model="form.password"></input-box>
    <input-box type="password" icon="icon-password" placeholder="请输入确认密码" v-model="form.cpassword"></input-box>
    <view class="btn-default u-btn-forget" @tap="onForget">确定</view>
  </view>
</template>
<script>
import InputBox from '@/components/InputBox'
import VerifyCode from '@/components/InputBox/VerifyCode'
import { GoForget } from '@/api/admin'
import { mapState } from 'vuex'
export default {
  components: {
    InputBox,
    VerifyCode
  },
  data() {
    return {
      // 表单信息
      form: {
        mobile: '', // 手机号
        verifyCode: '', // 验证码
        password: '', // 新密码
        cpassword: '' // 确认密码
      }
    }
  },
  onLoad() {},
  computed: {
    ...mapState(['verifyCode'])
  },
  methods: {
    // 点击确定按钮
    onForget() {
      const {
        form,
        returnBack,
        $var: { PhoneReg, PwdReg },
        $api: { Msg, Loading, RequestMsg }
      } = this
      const { mobile, verifyCode, password, cpassword } = form // form表单
      if (!PhoneReg.test(mobile)) {
        // 手机号校验
        Msg('手机号格式错误')
      } else if (verifyCode !== this.verifyCode) {
        // 验证码校验
        Msg('验证码错误')
      } else if (!PwdReg.test(password)) {
        // 密码校验
        Msg('密码格式错误')
      } else if (cpassword !== password) {
        // 重复密码校验
        Msg('两次密码不一致')
      } else {
        Loading()
        // 请求后台
        GoForget(form).then(res => {
          RequestMsg(res).then(() => {
            Msg('修改密码成功')
            // 延迟返回
            setTimeout(() => {
              returnBack()
            }, 500)
          })
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.m-forget {
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
  .u-btn-forget {
    margin-bottom: $common-padding * 2;
  }
  .u-register {
    @include same-height;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $common-font-size-min;
    > span {
      @include same-height;
      display: block;
      color: $common-color;
    }
  }
}
</style>
