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
  onLoad({ data }) {
    const { Agree, Clause } = DATA; // 模拟数据
    const blooType = data == 1; // 0:隐私条款,1:用户协议
    const title = blooType ? "用户协议" : "隐私条款"; // 获取标题
    this.content = blooType ? Agree : Clause; // 设置内容
    // 设置标题
    uni.setNavigationBarTitle({
      title
    });
  }
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