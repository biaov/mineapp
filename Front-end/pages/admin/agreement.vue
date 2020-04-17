<template>
  <!-- 用户协议/隐私条款 -->
  <view class="m-agreement">
    <rich-text :nodes="content" :selectable="true"></rich-text>
  </view>
</template>
<script>
import DATA from "@/utils/mock";
export default {
  data() {
    return {
      content: "" // 内容
    };
  },
  onLoad(options) {
    const { Agree, Clause } = DATA; // 模拟数据
    const type = options.data; // 接收数据
    let title;
    // 判断是否为用户协议类别
    if (type == 1) {
      this.content = Agree;
      title = "用户协议";
    } else {
      this.content = Clause;
      title = "隐私条款";
    }
    // 设置标题
    uni.setNavigationBarTitle({
      title
    });
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.m-agreement {
  padding: $common-padding;
  text-align: justify;
  color: $common-font-color-reduce;
  font-size: $common-font-size;
}
</style>