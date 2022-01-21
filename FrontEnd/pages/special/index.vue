<template>
  <!-- 特效列表 -->
  <view class="m-special">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length === 0"></no-data>
      <block v-else>
        <list-articel :list="listData" url="/pages/special/details" idName="href"></list-articel>
        <load-more :status="loadingType"></load-more>
      </block>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import NoData from '@/components/NoData'
import ListArticel from '@/components/ListCell/article'
import LoadMore from '@/components/LoadMore'
import { GetSpecialList } from '@/api/special'
const SIZE = 10
export default {
  components: {
    Layout,
    NoData,
    ListArticel,
    LoadMore
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      loadingType: 'more', // 加载状态
      // 列表数据
      listData: []
    }
  },
  onLoad() {
    this.loadData()
  },
  onReachBottom() {
    const { loadingType, loadData, listData } = this
    if (loadingType == 'more') {
      loadingType = 'loading'
      loadData(listData.length / SIZE + 1) // 加载数据
    }
  },
  methods: {
    // 加载页面数据
    loadData(current = 1) {
      GetSpecialList({ current, count: SIZE }).then(res => {
        const { $api, listData } = this
        $api.RequestMsg(res, false).then(({ list }) => {
          this.systemCrashState = false
          this.listData = current === 1 ? list : [...listData, ...list]
          this.loadingType = list.length < SIZE ? 'nomore' : 'more'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.m-special {
  padding: $common-padding;
}
</style>
