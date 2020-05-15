<template>
  <!-- 微信授权 -->
  <view class="m-authorize">
    <block v-if="isAuthorized">
      <view class="u-logo">
        <image :src="authorizeInfo.avatarUrl" mode="widthFix"></image>
      </view>
      <view class="m-info">
        <view>
          <text class="u-label">昵称</text>
          <text class="u-value">{{authorizeInfo.nickName}}</text>
        </view>
        <view>
          <text class="u-label">性别</text>
          <text class="u-value">{{authorizeInfo.gender|filterSex}}</text>
        </view>
        <view>
          <text class="u-label">国家</text>
          <text class="u-value">{{authorizeInfo.country}}</text>
        </view>
        <view>
          <text class="u-label">省份</text>
          <text class="u-value">{{authorizeInfo.province}}</text>
        </view>
        <view>
          <text class="u-label">城市</text>
          <text class="u-value">{{authorizeInfo.city}}</text>
        </view>
      </view>
    </block>
    <block v-else>
      <view class="u-logo">
        <image src="../../static/logo2.png" mode="widthFix"></image>
      </view>
      <view class="u-tit">申请获取以下权限</view>
      <div class="u-desc">获得你的公开信息(头像,昵称,性别,国家,省份,城市)</div>
      <button class="btn-default" open-type="getUserInfo" @getuserinfo="onSubmit">授权</button>
    </block>
  </view>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isAuthorized: false // 是否已经授权
    };
  },
  onLoad({ data }) {
    let flag = JSON.parse(data);
    this.isAuthorized = flag;
    // 判断是否已授权
    flag &&
      uni.getStorage({
        key: "authorizeInfo",
        success: res => {
          const { data } = res;
          // 如果本地存在登录信息,则保存登录信息到vuex里去
          !!data && this.Authorize(data);
        }
      });
  },
  computed: {
    ...mapState(["authorizeInfo"])
  },
  methods: {
    ...mapActions(["Authorize"]),
    // 点击授权
    onSubmit(res) {
      // #ifdef MP-WEIXIN
      // 判断是够允许授权
      const rawData = res.detail.rawData;
      if (!!rawData) {
        this.Authorize(JSON.parse(rawData)); // 保存授权信息
        this.isAuthorized = true;
      }
      //#endif
    }
  },
  filters: {
    // 过滤性别
    filterSex(value) {
      switch (+value) {
        case 0:
          return "女";
        case 1:
          return "男";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.m-authorize {
  padding: $common-padding;
  .u-logo {
    width: 120rpx;
    height: 124rpx;
    margin: 0 auto $common-padding * 1.5;
  }
  @mixin same-font {
    text-align: center;
    font-size: $common-font-size;
  }
  .u-tit {
    @include same-font;
    margin-bottom: $common-padding;
    color: $common-font-color;
  }
  .u-desc {
    @include same-font;
    margin-bottom: $common-padding * 2;
    color: $common-font-color-reduce;
  }
  .m-info {
    padding: 0 $common-padding * 4;
    > view {
      display: flex;
      padding: $common-padding/2 0;
      .u-label {
        position: relative;
        width: 70rpx;
        text-align: justify;
        text-align-last: justify;
        margin-right: $common-padding;
        color: $common-font-color-reduce;
        font-size: $common-font-size;
        &::after {
          content: ":";
          position: absolute;
          right: -$common-padding/2;
          top: 0;
        }
      }
      .u-value {
        flex-grow: 1;
        width: 50%;
        color: $common-font-color;
        font-size: $common-font-size;
      }
    }
  }
}
</style>