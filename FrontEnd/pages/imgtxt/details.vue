<template>
  <!-- 图文详情 -->
  <view class="m-details">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <view class="u-title">{{ title }}</view>
      <view class="u-time">{{ time }}</view>
      <view class="u-banner">
        <image :src="src" mode="widthFix"></image>
      </view>
      <view class="u-content">
        <rich-text :nodes="content"></rich-text>
      </view>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import { GetArticleDetails } from '@/api/imgtxt'
export default {
  components: {
    Layout
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      title: '网络连接出错', // 标题
      time: '0000-00-00 00:00:00', // 时间
      src: 'https://app.biaov.cn/mineapp/images/home/error.png', // 主图地址
      content: '<p>你的网络连接出现问题了，请及时处理</p>' // 内容
    }
  },
  onLoad({ data }) {
    this.loadData(data)
  },
  methods: {
    // 加载页面数据
    loadData(id) {
      // 请求后台
      GetArticleDetails({ id }).then(res => {
        this.$api.RequestMsg(res, false).then(({ title, createTime, src, content }) => {
          this.systemCrashState = false
          this.title = title
          this.time = createTime
          this.src = src
          this.content = content
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.m-details {
  padding: $common-padding;
  .u-title {
    margin-bottom: $common-padding;
    color: $common-font-color;
    font-size: $common-font-size-large;
    font-weight: bold;
  }
  .u-time {
    margin-bottom: $common-padding * 2;
    color: $common-font-color-reduce;
    font-size: $common-font-size-min;
  }
  .u-banner {
    width: 100%;
    margin-bottom: $common-padding;
  }
  .u-content {
    color: $common-font-color-reduce;
    font-size: $common-font-size;
  }
}
</style>
