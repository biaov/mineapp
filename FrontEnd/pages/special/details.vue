<template>
  <!-- 特效详情 -->
  <view class="m-special-details">
    <web-view :webview-styles="webviewStyles" :src="href"></web-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      href: "", // 链接地址
      // 进度条样式
      webviewStyles: {
        progress: {
          color: "#f60"
        }
      }
    };
  },
  onLoad({data}) {
    this.href = data;
  },
  methods: {}
};
</script>
<style scoped lang="scss">
</style>