<template>
  <!-- 热点 -->
  <view class="m-hot">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <!-- 热点特效 -->
      <list-articel :list="specialList" url="/pages/special/details" idName="href"></list-articel>
      <!-- 热点文章 -->
      <list-articel :list="articleList" url="/pages/imgtxt/details"></list-articel>
      <!-- 热点图片 -->
      <list-picture :list="pictureList"></list-picture>
    </Layout>
  </view>
</template>
<script>
import Layout from "@/components/Layout";
import ListArticel from "@/components/ListCell/article";
import ListPicture from "@/components/ListCell/picture";
import { GetSpecialList } from "@/api/special";
import { GetArticleList } from "@/api/imgtxt";
import { ImgPreview } from "@/api/function";
const SIZE = 2;
export default {
  components: {
    Layout,
    ListArticel,
    ListPicture
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      // 特效数据
      specialList: [],
      // 推荐文章
      articleList: [],
      // 图片数据
      pictureList: []
    };
  },
  onLoad() {
    this.loadData();
  },
  methods: {
    // 加载页面数据
    loadData(current = 1) {
      // 加载特效列表最新数据
      GetSpecialList({ current, count: SIZE }).then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.systemCrashState = false;
          this.specialList = list;
        });
      });
      // 加载文章信息
      GetArticleList({ current, count: SIZE }).then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.articleList = list;
        });
      });
      // 加载图片数据
      ImgPreview({ current, count: SIZE * 2 }).then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.pictureList = list;
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.m-hot {
  padding: $common-padding;
}
</style>