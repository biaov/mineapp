<template>
  <!-- 反馈列表 -->
  <view class="m-feedback">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length === 0"></no-data>
      <block v-else>
        <list-note :list="listData" url="/pages/user/feedbackDetails" idName="dfid" :isShowDelete="isShowDelete"></list-note>
        <load-more :status="loadingType"></load-more>
      </block>
      <view class="u-btn">
        <view class="btn-default" :class="isShowDelete ? 'delete' : 'edit'" @tap="handleBtn">
          <text class="iconfont" :class="isShowDelete ? 'icon-delete' : 'icon-edit'"></text>
          <text>{{ isShowDelete ? '删除' : '编辑' }}</text>
        </view>
        <view class="btn-default" @tap="navTo('/pages/user/feedbackNeed')" v-if="!isShowDelete">
          <text class="iconfont icon-yijian"></text>
          <text>我要反馈</text>
        </view>
        <view class="btn-default u-cancel" @tap="isShowDelete = false" v-if="isShowDelete">
          <text class="iconfont icon-cancel"></text>
          <text>取消</text>
        </view>
      </view>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import NoData from '@/components/NoData'
import ListNote from '@/components/ListCell/note'
import LoadMore from '@/components/LoadMore'
import { GetFeedbackList, GoFeedbackDelete } from '@/api/user'
const SIZE = 10
export default {
  components: {
    Layout,
    NoData,
    ListNote,
    LoadMore
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      loadingType: 'more', // 加载状态
      isShowDelete: false, // 是否显示删除操作
      // 列表数据
      listData: []
    }
  },
  onLoad() {
    this.loadData()
  },
  onShow() {
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
      // 请求后台
      GetFeedbackList({ current, count: SIZE }).then(res => {
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
    // 点击编辑删除按钮
    handleBtn() {
      const {
        isShowDelete,
        listData,
        loadData,
        $api: { Msg, Loading }
      } = this
      // 判断是否可编辑
      if (isShowDelete) {
        let ids = []
        listData.forEach(elem => {
          elem.state && ids.push(elem.dfid)
        })
        if (ids.length === 0) {
          Msg('请选择您要删除的反馈记录')
        } else {
          Loading()
          // 请求后台
          GoFeedbackDelete({ ids }).then(res => {
            RequestMsg(res).then(() => {
              Msg('删除成功')
              loadData()
              this.isShowDelete = false
            })
          })
        }
      } else {
        listData.length === 0 ? Msg('暂无数据') : (this.isShowDelete = true)
      }
    }
  }
}
</script>
<style scoped lang="scss">
$padding: $common-padding * 2 + 88rpx;
.m-feedback {
  width: 100vw;
  min-height: 100vh;
  padding: $common-padding 0 $padding;
  background: $uni-bg-color-content;
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
      width: 48%;
      transition: all 0.4s;
      &.edit,
      &.u-cancel {
        background: $common-font-color-reduce;
      }
      &.delete {
        background: $uni-color-error;
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
