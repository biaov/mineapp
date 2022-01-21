<template>
  <!-- Layout组件 -->
  <block>
    <!-- 网络崩溃页面 -->
    <system-crash @on-refresh="onRefresh" v-if="state"></system-crash>
    <!-- 主要内容 -->
    <view class="g-wrap" v-else>
      <slot></slot>
    </view>
  </block>
</template>
<script>
import SystemCrash from '@/components/SystemCrash'
export default {
  name: 'Layout',
  components: {
    SystemCrash
  },
  props: {
    // 状态值
    state: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    // 触发方法
    onRefresh() {
      this.$emit('on-refresh')
    }
  }
}
</script>
<style scoped lang="scss"></style>
