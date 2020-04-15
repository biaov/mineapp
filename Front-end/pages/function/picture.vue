<template>
  <!-- 图片预览列表 -->
  <view class="m-picture">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length===0"></no-data>
      <list-picture :list="listData" v-else></list-picture>
      <load-more :status="loadingType"></load-more>
    </Layout>
  </view>
</template>
<script>
import Layout from "@/components/Layout";
import ListPicture from "@/components/ListCell/picture";
import NoData from "@/components/NoData";
import LoadMore from "@/components/LoadMore";
import { ImgPreview } from "@/api/function";
const SIZE = 10; // 页数
export default {
  components: {
    Layout,
    ListPicture,
    NoData,
    LoadMore
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      // 列表数据
      listData: [],
      loadingType: "more" // 加载更多状态
    };
  },
  onLoad() {
    this.loadData();
  },
  onReachBottom() {
    if (this.loadingType == "more") {
      this.loadingType = "loading";
      this.loadData(this.listData.length / SIZE + 1);
    }
  },
  methods: {
    // 加载页面数据
    loadData(current = 1) {
      ImgPreview({ current, count: SIZE }).then(res => {
        this.$api.RequestMsg(res, false).then(data => {
          this.systemCrashState = false;
          const { list } = data;
          this.listData = current === 1 ? list : [...this.listData, ...list];
          this.loadingType = list.length < SIZE ? "nomore" : "more";
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.m-picture {
  padding: $common-padding;
}
</style>