<template>
  <!-- 关于我们 -->
  <view class="m-about-us">
    <list-cell url="/pages/admin/agreement?data=1">用户协议</list-cell>
    <list-cell url="/pages/admin/agreement?data=0">隐私条款</list-cell>
    <list-cell url="/pages/user/mineapp">APP下载</list-cell>
    <!--  #ifdef  APP-PLUS -->
    <list-cell @on-click="onUpdate" :subtit="'当前版本：' + version">版本更新</list-cell>
    <hot-update :isUpdate="isUpdate"></hot-update>
    <!--  #endif -->
  </view>
</template>
<script>
import ListCell from '@/components/ListCell'
import HotUpdate from '@/components/HotUpdate'
export default {
  components: {
    ListCell,
    HotUpdate
  },
  data() {
    return {
      version: '', // 版本号
      isUpdate: false // 是否显示更新
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    this.setVersion() // 设置版本号
    // #endif
  },
  methods: {
    // #ifdef APP-PLUS
    // 设置版本号
    setVersion() {
      // 获取版本号信息
      this.$api.VersionInfo().then(({ version }) => {
        this.version = version
      })
    },
    // 版本更新
    onUpdate() {
      this.isUpdate = !this.isUpdate
    }
    // #endif
  }
}
</script>
<style scoped lang="scss"></style>
