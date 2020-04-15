<template>
  <!-- 用户中心 -->
  <view class="m-user">
    <view class="m-hd">
      <view class="u-img" @tap="onAvatar">
        <image :src="isLogin?avatar:'/static/default_avatar.png'" mode="widthFix"></image>
      </view>
      <view class="u-text">
        <!-- 是否登录 -->
        <block v-if="!isLogin">
          <view class="u-nologin" @tap="navTo('/pages/admin/login')">
            <text>登录/注册</text>
            <text class="iconfont icon-right"></text>
          </view>
        </block>
        <block v-else>
          <view class="u-nickname">
            <text>{{nickname||"--"}}</text>
            <text class="iconfont" :class="sex===1?'icon-lunkuodasan-1':'icon-lunkuodasan-'"></text>
          </view>
          <view class="u-signature">个性签名：{{signature||"--"}}</view>
        </block>
      </view>
    </view>
    <!-- 九宫格 -->
    <view class="m-grid">
      <uni-grid :column="3" :highlight="true" @change="onChange">
        <uni-grid-item v-for="(item, index) in gridList" :index="index" :key="index">
          <icon-text :icon="item.icon" :iconColor="item.iconColor" :text="item.text"></icon-text>
        </uni-grid-item>
      </uni-grid>
    </view>
    <!-- 列表 -->
    <view class="m-list-block">
      <list-cell url="/pages/user/setting" icon="icon-set" iconColor="#54b4ef" :isNeedSignIn="true">个人设置</list-cell>
      <list-cell url="/pages/user/noteList" icon="icon-bijinotes23" iconColor="#9789f7" :isNeedSignIn="true">我的笔记</list-cell>
      <list-cell url="/pages/user/feedback" icon="icon-yijian" iconColor="#272636" :isNeedSignIn="true">我的反馈</list-cell>
      <list-cell url="/pages/public/help" icon="icon-helpcenter" iconColor="#cf2820">帮助中心</list-cell>
      <list-cell url="/pages/user/aboutUs" icon="icon-about" iconColor="#5fcda2">关于MINEAPP</list-cell>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import ListCell from "@/components/ListCell";
import UniGrid from "@/components/UniGrid";
import UniGridItem from "@/components/UniGrid/UniGridItem";
import IconText from "@/components/UniGrid/IconText";
import { GetUserInfo } from "@/api/user";
export default {
  components: {
    ListCell,
    UniGrid,
    UniGridItem,
    IconText
  },
  data() {
    return {
      avatar: "", // 用户头像
      nickname: "", // 标题
      sex: 0, // 0:女,1:男
      signature: "", // 个性签名
      // 九宫格
      gridList: [
        {
          icon: "icon-tiyu-paoku",
          iconColor: "#01296f",
          text: "炫酷"
        },
        {
          icon: "icon-wenzhang",
          iconColor: "#A86dff",
          text: "文章"
        },
        {
          icon: "icon-gongneng",
          iconColor: "#4995ed",
          text: "功能"
        }
      ]
    };
  },
  onLoad() {
    this.loadData();
  },
  onShow() {
    this.loadData();
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    // 加载页面数据
    loadData() {
      // 判断是否登录
      if (this.isLogin) {
        GetUserInfo().then(res => {
          this.$api.RequestMsg(res, false).then(data => {
            const { avatar, nickname, sex, signature } = data;
            this.avatar = avatar;
            this.nickname = nickname;
            this.sex = sex;
            this.signature = signature;
          });
        });
      }
    },
    // 点击列表
    onChange(e) {
      // console.log(e.detail.index);
      switch (e.detail.index) {
        case 0:
          uni.switchTab({
            url: "/pages/special/index"
          });
          break;
        case 1:
          uni.switchTab({
            url: "/pages/imgtxt/index"
          });
          break;
        case 2:
          this.navTo("/pages/function/index");
          break;
      }
    },
    // 点击头像
    onAvatar() {
      // 已登录跳设置，未登录跳登录
      let url = this.isLogin ? "/pages/user/setting" : "/pages/admin/login";
      this.navTo(url);
    }
  }
};
</script>
<style scoped lang="scss">
$hd-height: 120rpx;
.m-user {
  width: 100vw;
  min-height: calc(100vh - 100rpx);
  padding: $common-padding;
  background: $uni-bg-color-content;
  .m-hd {
    display: flex;
    border-radius: 12rpx;
    margin-bottom: 40rpx;
    padding: $common-padding;
    background: $uni-bg-color;
    .u-img {
      width: $hd-height;
      height: $hd-height;
      border: 2px solid $uni-bg-color-content;
      border-radius: 50%;
      margin-right: 20rpx;
      padding: 2px;
      background: $uni-bg-color;
      overflow: hidden;
      > image {
        width: 100%;
        border-radius: 50%;
      }
    }
    .u-text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      width: 50%;
      height: $hd-height;
      .u-nologin {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        > text {
          color: $common-font-color-reduce;
          font-size: $common-font-size-large;
          &:last-child {
            font-size: 40rpx;
          }
        }
      }
      .u-nickname {
        display: flex;
        align-items: center;
        height: 60rpx;
        > text {
          color: $common-font-color;
          font-size: $common-font-size;
          &:first-child {
            @include clamp;
            font-weight: 700;
          }
          &:last-child {
            padding-left: 10rpx;
            font-size: $common-font-size-large;
            &.icon-lunkuodasan- {
              color: #f60;
            }
            &.icon-lunkuodasan-1 {
              color: #459df5;
            }
          }
        }
      }
      .u-signature {
        @include clamp-two;
        color: $common-font-color-reduce;
        font-size: $common-font-size-min;
      }
    }
  }
  .m-grid {
    width: 100%;
    border-radius: 8rpx;
    margin-bottom: 30rpx;
    padding: 30rpx;
    background: #fff;
  }
  .m-list-block {
    border-radius: 12rpx;
    background: $uni-bg-color;
    overflow: hidden;
  }
}
</style>