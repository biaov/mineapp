<template>
  <!-- 帮助中心列表 -->
  <view class="m-help">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length === 0"></no-data>
      <block v-else>
        <list-cell v-for="(item, index) in listData" :key="index" :url="listDataUrl + item.dqid" :subtit="item.createTime" class="list-cell">{{ item.title }}</list-cell>
        <load-more :status="loadingType"></load-more>
        <view class="u-btn">
          <view class="btn-default" @tap="handleBtn">
            <text class="iconfont icon-yijian"></text>
            <text>我要反馈</text>
          </view>
        </view>
      </block>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import NoData from '@/components/NoData'
import ListCell from '@/components/ListCell'
import LoadMore from '@/components/LoadMore'
import { mapState } from 'vuex'
import { GetHelpList } from '@/api/public'
const SIZE = 10
export default {
  components: {
    Layout,
    NoData,
    ListCell,
    LoadMore
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      loadingType: 'more', // 加载状态
      isShowDelete: false, // 是否显示删除操作
      // 列表数据
      listData: [],
      listDataUrl: '/pages/public/helpDetails?data=' // 跳转详情地址
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
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    // 加载页面数据
    loadData(current = 1) {
      // 请求后台
      GetHelpList({ current, count: SIZE }).then(res => {
        const { $api, listData } = this
        $api.RequestMsg(res, false).then(({ list }) => {
          this.systemCrashState = false
          list.forEach(elem => {
            elem.state = false
          })
          this.listData = current === 1 ? list : [...listData, ...list] // 设置表格数据
          this.loadingType = list.length < SIZE ? 'nomore' : 'more'
        })
      })
    },
    // 点击我要反馈按钮
    handleBtn() {
      const { isLogin, navTo } = this
      const url = isLogin ? '/pages/user/feedbackNeed' : '/pages/admin/login' // 获取URL地址
      navTo(url) // 跳转到指定页面
    }
  }
}
</script>
<style scoped lang="scss">
$padding: $common-padding * 2 + 88rpx;
.m-help {
  width: 100vw;
  min-height: 100vh;
  padding: $common-padding 0 $padding;
  background: $uni-bg-color-content;
  .list-cell {
    margin-bottom: $common-padding / 2;
  }
  .u-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: $padding;
    padding: $common-padding;
    box-shadow: 0;
    background: #fff;
    .btn-default {
      transition: all 0.4s;
      @mixin same-width {
        width: 48%;
      }
      &.edit {
        background: $common-font-color-reduce;
      }
      &.delete {
        @include same-width;
        background: $uni-color-error;
      }
      &.u-cancel {
        @include same-width;
        background: $common-font-color-reduce;
      }
      .iconfont {
        padding-right: 10rpx;
      }
      > text {
        vertical-align: middle;
      }
    }
  }
}
</style>
