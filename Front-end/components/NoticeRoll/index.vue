<template>
  <!-- 组件-公告 -->
  <view class="m-notice">
    <text class="iconfont icon-notice u-icon-lf"></text>
    <view class="u-text" @tap="onDetails(0)">
      <text class="u-notice">{{title}}</text>
    </view>
    <text class="iconfont icon-right u-icon-rt" @tap="onDetails(1)"></text>
  </view>
</template>
<script>
export default {
  name:"NoticeRoll",
  props: {
    // 标题
    title: {
      type: String,
      required: true
    },
    // 列表id
    dnid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    // 点击详情按钮
    onDetails(num) {
      // 判断有无公告
      if (this.dnid === 0) {
        this.$api.Msg("暂无公告");
      } else {
        const url = num === 1 ? `/pages/public/noticeList` : `/pages/public/noticeDetails?data=${this.dnid}`;
        this.navTo(url);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.m-notice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  border-radius: 6rpx;
  margin-bottom: 40rpx;
  background: $uni-bg-color-content;
  @mixin same-icon {
    display: block;
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: $common-font-color-reduce;
  }
  .u-icon-lf {
    @include same-icon;
  }
  .u-icon-rt {
    @include same-icon;
  }
  .u-text {
    flex-grow: 1;
    width: 50%;
    height: 80rpx;
    line-height: 80rpx;
    overflow: hidden;
    .u-notice {
      display: block;
      color: $common-font-color;
      font-size: 24rpx;
      transform: translateX(100%);
      animation: rollAnimation 14s linear infinite;
    }
  }
}
</style>