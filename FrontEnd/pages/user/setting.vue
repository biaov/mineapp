<template>
  <!-- 我的设置 -->
  <view class="m-setting">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <list-cell :avatar="avatar" @on-click="onAvatar">头像</list-cell>
      <list-cell :subtit="nickname" :url="'/pages/user/nickname?data=' + nickname">昵称</list-cell>
      <list-cell :subtit="sex | filterSex" @on-click="onSex">性别</list-cell>
      <list-cell :subtit="signature" :url="'/pages/user/signature?data=' + $api.EnDnCodeURL(signature)">个性签名</list-cell>
      <list-cell :subtit="mobile">手机号</list-cell>
      <list-cell subtit="修改" url="/pages/user/editPwd">登录密码</list-cell>
      <view class="u-btn">
        <view class="btn-default" @tap="onExit">
          <text class="iconfont icon-tuichu5"></text>
          退出登录
        </view>
      </view>
    </Layout>
  </view>
</template>
<script>
import Layout from '@/components/Layout'
import ListCell from '@/components/ListCell'
import { mapActions, mapGetters } from 'vuex'
import { GetUserInfo, GoEditInfo } from '@/api/user'
import { GoUploadImg } from '@/api/public'
export default {
  components: {
    Layout,
    ListCell
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      mobile: '', // 手机号
      avatar: '', // 用户头像
      nickname: '', // 标题
      sex: 0, // 0:女,1:男
      signature: '' // 个性签名
    }
  },
  onLoad() {
    this.loadData()
  },
  onShow() {
    this.loadData()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['Logout']),
    // 加载页面数据
    loadData() {
      GetUserInfo().then(res => {
        this.$api.RequestMsg(res, false).then(data => {
          this.systemCrashState = false
          // 循环遍历设置用户信息
          for (const key in data) {
            this[key] = data[key]
          }
        })
      })
    },
    // 点击头像
    onAvatar() {
      const {
        $api: { SelectImg, Loading, RequestMsg }
      } = this
      // 选择图片
      SelectImg().then(res => {
        Loading()
        // 上传图片
        GoUploadImg(res.tempFilePaths[0]).then(res2 => {
          RequestMsg(res2).then(({ url }) => {
            // 修改头像
            GoEditInfo({
              avatar: url
            }).then(res3 => {
              RequestMsg(res3).then(() => {
                Msg('上传成功')
                this.avatar = avatar
              })
            })
          })
        })
      })
    },
    // 点击性别
    onSex() {
      const {
        $api: { ShowActionSheet, Loading, RequestMsg, Msg }
      } = this
      ShowActionSheet(['女', '男']).then(sex => {
        Loading()
        GoEditInfo({ sex }).then(res => {
          RequestMsg(res).then(() => {
            Msg('修改成功')
            this.sex = sex
          })
        })
      })
    },
    // 点击退出登录按钮
    onExit() {
      this.Logout() // 退出登录
      uni.redirectTo({
        url: '/pages/admin/login'
      })
    }
  },
  filters: {
    // 过滤性别
    filterSex(value) {
      return value === 1 ? '男' : '女'
    }
  }
}
</script>
<style scoped lang="scss">
$padding: $common-padding * 2 + 88rpx;
.m-setting {
  padding: $common-padding 0 $padding;
  .u-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100vw;
    height: $padding;
    padding: $common-padding;
    box-shadow: 0;
    background: #fff;
    .iconfont {
      padding-right: 20rpx;
    }
  }
}
</style>
