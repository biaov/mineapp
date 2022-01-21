<template>
  <view class="m-progress" :style="'height:' + height + 'rpx;background:' + bgc + ';'" :class="animation ? 'animation' : ''">
    <text :style="'transform: translateX(-' + (100 - progress) + '%); height:' + height + 'rpx;'"></text>
    <text :style="'transform: translateX(-' + (100 - person.pro) + '%); height:' + height + 'rpx; background:' + person.bgc + ';'"></text>
  </view>
</template>
<script>
export default {
  name: 'MineProgress',
  props: {
    // 高度
    height: {
      type: Number,
      default: 24
    },
    // 背景色
    bgc: {
      type: String,
      default: '#c9c9c9'
    },
    // 一级进度条
    progress: {
      type: Number,
      default: 0
    },
    // 二级进度条
    person: {
      type: Object,
      default() {
        return {
          pro: 0,
          bgc: ''
        }
      }
    },
    // 动画
    animation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.m-progress {
  position: relative;
  width: 100%;
  height: 20rpx;
  border-radius: 10rpx;
  background: #c9c9c9;
  overflow: hidden;

  > text {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
    background: -webkit-linear-gradient(180deg, #fac63a, #fdd92b, #fac63a);
    background: linear-gradient(180deg, #fac63a, #fdd92b, #fac63a);
    transform: translateX(-0%);
    &:last-child {
      background: #31d441;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      height: 24px;
      background: url(~@/static/progress.png) 0 0 repeat-x;
      border-radius: 10px;
    }
  }
  &.animation > text {
    transition: all 0.4s;
  }
}
</style>
