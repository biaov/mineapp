<template>
  <!-- 笔记列表 -->
  <view class="m-note-list">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length === 0"></no-data>
      <block v-else>
        <list-note :list="listData" url="/pages/user/noteDetails" :isShowDelete="isShowDelete"></list-note>
        <load-more :status="loadingType"></load-more>
      </block>
      <view class="u-btn">
        <view class="btn-default" :class="isShowDelete ? 'delete' : 'edit'" @tap="handleBtn">
          <text class="iconfont" :class="isShowDelete ? 'icon-delete' : 'icon-edit'"></text>
          <text>{{ isShowDelete ? '删除' : '编辑' }}</text>
        </view>
        <view class="btn-default" @tap="navTo('/pages/user/noteEdit')" v-if="!isShowDelete">
          <text class="iconfont icon-yijian"></text>
          <text>写笔记</text>
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
import { GetNoteList, GoNoteDelete } from '@/api/user'
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
    if (this.loadingType == 'more') {
      this.loadingType = 'loading'
      this.loadData(this.listData.length / SIZE + 1)
    }
  },
  methods: {
    // 加载页面数据
    loadData(current = 1) {
      GetNoteList({ current, count: SIZE }).then(res => {
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
        $api: { Msg, Loading, RequestMsg }
      } = this
      // 判断是否可编辑
      if (this.isShowDelete) {
        let ids = []
        listData.forEach(elem => {
          elem.state && ids.push(elem.dnid)
        })
        if (ids.length === 0) {
          Msg('请选择您要删除的笔记')
        } else {
          Loading()
          GoNoteDelete({ ids }).then(res => {
            RequestMsg(res).then(data => {
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
.m-note-list {
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
