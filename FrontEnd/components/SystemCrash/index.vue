<template>
  <!-- 系统崩溃页面 -->
  <view class="m-system-crash" v-if="isShow">
    <view class="u-con" v-if="!isShowRefresh">
      <text class="iconfont icon-wangluocuowu"></text>
      <text class="u-text">系统崩溃了，请检查一下网络</text>
      <view class="btn-default u-btn-refresh" @tap="onRefresh">刷新</view>
    </view>
    <Loading :state="isShowRefresh" @on-change="onChange" v-else></Loading>
  </view>
</template>
<script>
import Loading from './loading'
export default {
  name: 'SystemCrash',
  components: {
    Loading
  },
  data() {
    return {
      isShow: false, // 是否显示该页面
      isShowRefresh: false // 是否显示刷新
    }
  },
  onLoad() {},
  methods: {
    // 点击刷新按钮
    onRefresh() {
      this.isShowRefresh = true
      this.$emit('on-refresh')
    },
    // 当页面加载一段时间后
    onChange(bool) {
      this.isShowRefresh = bool
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true
    }, 500)
  }
}
</script>
<style scoped lang="scss">
.m-system-crash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  background: #fff;
  .u-con {
    padding-top: $common-padding * 8;
    text-align: center;
    .iconfont {
      display: block;
      margin-bottom: $common-padding;
      color: #f56c6c;
      font-size: 200rpx;
    }
    .u-text {
      display: block;
      margin-bottom: $common-padding * 2;
      color: $common-font-color;
      font-size: $common-font-size;
    }
    .u-btn-refresh {
      width: 160rpx;
      margin: 0 auto;
    }
  }
}
</style>
