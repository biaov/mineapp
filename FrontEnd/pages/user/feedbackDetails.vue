<template>
  <!-- 反馈详情 -->
  <view class="m-details">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <view class="u-title">{{ title }}</view>
      <view class="u-time">{{ time }}</view>
      <view class="u-content">
        <rich-text :nodes="content"></rich-text>
      </view>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import { GetFeedbackDetails } from '@/api/user'
export default {
  components: {
    Layout
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      title: '网络连接出错', // 标题
      time: '0000-00-00 00:00:00', // 时间
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
      GetFeedbackDetails({ id }).then(res => {
        this.$api.RequestMsg(res, false).then(({ title, createTime, content }) => {
          this.systemCrashState = false
          this.title = title
          this.time = createTime
          this.content = !content ? '处理中...' : content
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
    margin-bottom: $common-padding * 1.2;
    color: $common-font-color-reduce;
    font-size: $common-font-size-min;
  }
  .u-content {
    color: $common-font-color-reduce;
    font-size: $common-font-size;
  }
}
</style>
