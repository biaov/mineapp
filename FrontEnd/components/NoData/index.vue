<template>
  <!-- 没有数据 -->
  <view class="m-no-data">没有数据</view>
</template>
<script>
export default {
  name: 'NoData',
  data() {
    return {}
  },
  onLoad() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.m-no-data {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: $common-font-color-reduce;
  font-size: $common-font-size;
}
</style>
