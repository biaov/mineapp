<template>
  <!-- APP信息 -->
  <view class="m-mine-app">
    <view class="u-qrcode">
      <text>Android</text>
      <text>H5</text>
      <image src="http://app.biaov.cn/mineapp/images/qrcode/android.png" mode="widthFix"></image>
      <image src="http://app.biaov.cn/mineapp/images/qrcode/H5.png" mode="widthFix"></image>
    </view>
    <view class="u-btn">
      <view @tap="onBtn('APP')">打开APP下载地址</view>
      <view @tap="onBtn('H5')">打开H5地址</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    // 点击下载按钮
    onBtn(type) {
      const { H5Url, DownUrl } = this.$var
      let url = type === 'APP' ? DownUrl : H5Url
      // #ifndef APP-PLUS
      window.location.href = url
      // #endif
      // #ifdef APP-PLUS
      plus.runtime.openURL(url)
      // #endif
    }
  }
}
</script>
<style scoped lang="scss">
.m-mine-app {
  padding: $common-padding * 4 $common-padding $common-padding;
  .u-qrcode {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $common-padding;
    text-align: center;
    color: $common-font-color;
    font-size: $common-font-size-large;
    font-weight: bold;
    > text,
    > image {
      width: 50%;
    }
  }
  .u-btn {
    display: flex;
    justify-content: space-between;
    > view {
      @include btn-default;
      width: 45%;
    }
  }
}
</style>
