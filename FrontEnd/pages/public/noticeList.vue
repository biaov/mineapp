<template>
  <!-- 公告列表 -->
  <view class="m-notice-list">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length===0"></no-data>
      <block v-else>
        <list-cell v-for="(item,index) in listData" :key="index" :url="'/pages/public/noticeDetails?data='+item.dnid">{{item.title}}</list-cell>
      </block>
    </Layout>
  </view>
</template>
<script>
import Layout from "@/components/Layout";
import ListCell from "@/components/ListCell";
import NoData from "@/components/NoData";
import { GetNoticeList } from "@/api/public";
export default {
  components: {
    Layout,
    ListCell,
    NoData
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      // 公告列表
      listData: []
    };
  },
  onLoad() {
    this.loadData();
  },
  methods: {
    // 加载页面数据
    loadData() {
      // 请求后台
      GetNoticeList().then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.systemCrashState = false;
          this.listData = list;
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
</style>