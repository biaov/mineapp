<template>
  <view class="m-icon-text">
    <text class="iconfont" :class="icon" :style="'color:'+iconColor+';'"></text>
    <text class="u-txt">{{text}}</text>
  </view>
</template>
<script>
export default {
  name: "IconText",
  props: {
    // 图标
    icon: {
      type: String,
      required: true
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: "#f60"
    },
    // 内容
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.m-icon-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .iconfont {
    // height: 60rpx;
    color: #f60;
    font-size: 60rpx;
  }
  .u-txt {
    color: $common-font-color;
    font-size: $common-font-size;
  }
}
</style>