<template>
  <!-- 验证码输入框 -->
  <view class="m-input input-box">
    <text class="iconfont" :class="icon"></text>
    <input type="text" class="u-input" :placeholder="placeholder" :placeholder-style="'color:'+placeholderStyle" v-model="inputValue" maxlength="6">
    <text class="u-countdown" :class="isCountdown?'disabled':''" @tap="getVerifyCode">{{isCountdown?time+"s后重新获取":"获取验证码"}}</text>
  </view>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "VerifyCode",
  // 父组件使用v-model
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    // input类型
    type: {
      type: String,
      default: "text"
    },
    // 类别图标
    icon: {
      type: String,
      required: true
    },
    // 占位符
    placeholder: {
      type: String,
      default: "请输入..."
    },
    // 占位符样式
    placeholderStyle: {
      type: String,
      default: "#a4abb3"
    },
    // 动态传值
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inputValue: "", // input输入框绑定的值
      isCountdown: false, // 是否处于倒计时状态
      time: 60 // 倒计时
    };
  },
  onLoad() {
    this.inputValue = this.value;
  },
  methods: {
    ...mapActions(["VerifyCode"]),
    // 开启倒计时
    startCountdown() {
      let timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.isCountdown = !this.isCountdown;
          clearInterval(timer);
          this.time = 60;
        }
      }, 1000);
    },
    // 设置验证码
    setVerifyCode() {
      let code = this.$api.RandomNumber();
      this.VerifyCode(code);
      setTimeout(() => {
        this.$api.Msg(code);
      }, 1500);
    },
    // 点击验证码按钮
    getVerifyCode() {
      if (!this.isCountdown) {
        this.setVerifyCode();
        this.isCountdown = !this.isCountdown;
        this.startCountdown();
      }
    }
  },
  watch: {
    // 监听input输入框内值的变化
    inputValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style scoped lang="scss">
@mixin same-height {
  height: 88rpx;
  line-height: 88rpx;
}
.m-input {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 88rpx;
  border-radius: 44rpx;
  padding: 0 20rpx;
  background: $uni-bg-color-content;
  overflow: hidden;
  .iconfont {
    @include same-height;
    width: 80rpx;
    text-align: center;
    color: $common-font-color-reduce;
  }
  .u-input {
    @include same-height;
    flex-grow: 1;
    width: 50%;
    border: none;
    background: transparent;
    color: #494949;
    font-size: $common-font-size;
    outline: none;
  }
  .u-countdown {
    @include same-height;
    width: 170rpx;
    text-align: center;
    color: $common-color;
    font-size: $common-font-size;
    &.disabled {
      width: 220rpx;
      color: $common-font-color-reduce;
    }
  }
}
</style>