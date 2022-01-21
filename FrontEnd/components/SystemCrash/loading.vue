<template>
  <!-- 加载框 -->
  <view class="m-loading">
    <text class="iconfont icon-Loading" :class="state ? 'rotate' : ''"></text>
    <text class="iconfont icon-Loading" :class="state ? 'rotate2' : ''"></text>
    <text class="iconfont icon-Loading" :class="state ? 'rotate' : ''"></text>
  </view>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    // 加载状态
    state: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
  mounted() {
    if (this.state) {
      setTimeout(() => {
        this.$emit('on-change', false)
      }, 3000)
    }
  }
}
</script>
<style scoped lang="scss">
.m-loading {
  position: relative;
  height: 400rpx;
  margin-top: $common-padding * 8;
  text-align: center;
  .iconfont {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    transform: translate(-50%, -50%) rotate(0);
    &:first-child {
      color: #f66;
      font-size: 200rpx;
    }
    &:nth-child(2) {
      color: #febb62;
      font-size: 120rpx;
    }
    &:nth-child(3) {
      color: #f60;
      font-size: 60rpx;
    }
  }
}
</style>
