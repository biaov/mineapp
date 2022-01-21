<template>
  <!-- 普通/密码输入框 -->
  <view class="m-input">
    <text class="iconfont" :class="icon"></text>
    <input :type="isShowPwd || type === 'text' ? 'text' : 'password'" class="u-input" :placeholder="placeholder" :placeholder-style="'color:' + placeholderStyle" v-model="inputValue" />
    <text class="iconfont" :class="type !== 'text' ? (isShowPwd ? 'icon-in_zhengyan' : 'icon-in_biyan') : 'icon-close1'" @tap="handleBtn"></text>
  </view>
</template>
<script>
export default {
  name: 'InputBox',
  // 父组件使用v-model
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // input类型
    type: {
      type: String,
      default: 'text'
    },
    // 类别图标
    icon: {
      type: String,
      required: true
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请输入...'
    },
    // 占位符样式
    placeholderStyle: {
      type: String,
      default: '#a4abb3'
    },
    // 动态传值
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowPwd: false, // 是否显示密码
      inputValue: '' // input输入框绑定的值
    }
  },
  onLoad() {
    this.inputValue = this.value
  },
  methods: {
    // 点击清理/眼睛按钮
    handleBtn() {
      if (this.type === 'text') {
        this.inputValue = ''
      } else {
        this.isShowPwd = !this.isShowPwd
      }
    }
  },
  watch: {
    // 监听input输入框内值的变化
    inputValue(val) {
      this.$emit('input', val)
    }
  }
}
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
  margin-bottom: $common-padding;
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
    &::-webkit-input-placeholder {
      color: #a4abb3;
    }
  }
}
</style>
