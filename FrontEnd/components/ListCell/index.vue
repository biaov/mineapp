<template>
  <!-- 列表 -->
  <view class="m-list-cell" @tap="handleLi">
    <view class="u-lf">
      <text class="iconfont u-icon" :class="icon" :style="'color:'+iconColor" v-if="!!icon"></text>
      <text class="u-tit">
        <slot></slot>
      </text>
    </view>
    <view class="u-rt">
      <text class="u-subtit" v-if="!!subtit">{{subtit}}</text>
      <view class="u-avatar" v-else>
        <image :src="avatar" mode="widthFix"></image>
      </view>
      <view class="u-icon-show">
        <text class="iconfont icon-right" v-if="!!url"></text>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ListCell",
  props: {
    // 左边图标
    icon: {
      type: String,
      default: ""
    },
    // 左边图标颜色
    iconColor: {
      type: String,
      default: "#f60"
    },
    // 右侧标题
    subtit: {
      type: String,
      default: ""
    },
    // 头像
    avatar: {
      type: String,
      default: ""
    },
    // 跳转页面
    url: {
      type: String,
      default: ""
    },
    // 是否需要登录
    isNeedSignIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  onLoad() {},
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    // 点击列表
    handleLi() {
      let url = this.url;
      // 判断是否是否需要跳转
      if (!url) {
        this.$emit("on-click"); // 自定义点击事件
      } else if (this.isNeedSignIn && !this.isLogin) {
        this.navTo("/pages/admin/login");
      } else {
        // 跳转页面
        this.navTo(url);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.m-list-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid $uni-bg-color-content;
  padding: 10rpx $common-padding;
  background: $uni-bg-color;
  @mixin same-width {
    flex-grow: 1;
    display: flex;
    align-items: center;
    width: 50%;
    height: 80rpx;
  }
  @mixin same-height {
    height: 80rpx;
    line-height: 80rpx;
  }
  @mixin same-title {
    @include clamp;
    @include same-height;
    flex-grow: 1;
    width: 50%;
  }
  .u-lf {
    @include same-width;
    .u-icon {
      @include same-height;
      width: 40rpx;
      margin-right: 20rpx;
      color: #f60;
      font-size: 32rpx;
    }
    .u-tit {
      @include same-title;
      color: $common-font-color;
      font-size: $common-font-size;
    }
  }
  .u-rt {
    @include same-width;
    justify-content: flex-end;
    text-align: right;
    .u-subtit {
      @include same-title;
      color: $common-font-color-reduce;
      font-size: $common-font-size-min;
    }
    .u-avatar {
      @include same-height;
      width: 80rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    .u-icon-show {
      @include same-height;
      width: 40rpx;
      .iconfont {
        color: $common-font-color-reduce;
      }
    }
  }
}
</style>