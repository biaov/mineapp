<template>
  <!-- 图文 -->
  <view class="m-imgtext">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <no-data v-if="listData.length === 0"></no-data>
      <block v-else>
        <view class="m-list-article">
          <block v-for="(item, index) in listData" :key="index">
            <view :class="index === 0 ? 'u-first' : 'u-li'" @tap="navTo(`/pages/imgtxt/details?data=${item.daid}`)">
              <view class="u-img">
                <image :src="item.src" mode="widthFix"></image>
              </view>
              <view class="u-text">
                <view class="u-tit">{{ item.title }}</view>
                <view class="u-time">{{ item.createTime }}</view>
              </view>
            </view>
          </block>
        </view>
        <load-more :status="loadingType"></load-more>
      </block>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import NoData from '@/components/NoData'
import LoadMore from '@/components/LoadMore'
import { GetArticleList } from '@/api/imgtxt'
const SIZE = 10
export default {
  components: {
    Layout,
    NoData,
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
      // 请求后台
      GetArticleList({ current, count: SIZE }).then(res => {
        const { $api, listData } = this
        $api.RequestMsg(res, false).then(({ list }) => {
          this.systemCrashState = false
          this.listData = current === 1 ? list : [...listData, ...list] // 设置列表数据
          this.loadingType = list.length < SIZE ? 'nomore' : 'more'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
$first-color: #fff;
.m-imgtext {
  .m-list-article {
    .u-first {
      position: relative;
      width: 100vw;
      height: 440rpx;
      background: $uni-bg-color-content;
      overflow: hidden;
      .u-img {
        width: 100%;
        min-height: 100%;
      }
      .u-text {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 12rpx $common-padding;
        background: rgba(0, 0, 0, 0.35);
        .u-tit {
          @include clamp;
          color: $first-color;
          font-size: 30rpx;
          font-weight: bold;
        }
        .u-time {
          opacity: 0.9;
          color: $first-color;
          font-size: $common-font-size-min;
        }
      }
    }
    .u-li {
      display: flex;
      align-items: center;
      width: 100%;
      // height: 162rpx;
      padding: 20rpx $common-padding;
      border-bottom: 1px solid $uni-bg-color-content;
      .u-img {
        width: 120rpx;
        // height: 120rpx;
        margin-right: 20rpx;
        border-radius: 6rpx;
        overflow: hidden;
      }
      .u-text {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50%;
        // height: 100rpx;
        .u-tit {
          @include clamp-two;
          margin-bottom: 2px;
          color: $common-font-color;
          font-size: $common-font-size-min;
        }
        .u-time {
          color: $common-font-color-reduce;
          font-size: $common-font-size-min;
        }
      }
    }
  }
}
</style>
