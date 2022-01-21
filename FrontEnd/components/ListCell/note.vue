<template>
  <!-- 笔记列表 -->
  <view class="m-list-note">
    <view v-for="(item, index) in list" :key="index" @tap="handleLi(item)">
      <view class="u-lf">
        <view class="u-tit">{{ item.title }}</view>
        <view class="u-time">{{ item.createTime }}</view>
      </view>
      <view class="u-rt"><text class="iconfont" :class="item.state ? 'icon-dui' : 'icon-weibiaoti38'" v-if="isShowDelete"></text></view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'ListNote',
  props: {
    // 列表数据
    list: {
      type: Array,
      required: true
    },
    // 跳转地址
    url: {
      type: String,
      default: ''
    },
    // 是否显示删除
    isShowDelete: {
      type: Boolean,
      default: false
    },
    // id类型名称
    idName: {
      type: String,
      default: 'dnid'
    }
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    // 点击列表
    handleLi(item) {
      const { url, isShowDelete, idName } = this
      // 判断是否显示删除
      if (isShowDelete) {
        item.state = !item.state
      } else if (!!url) {
        // 判断是否允许跳转，默认不传不跳转
        this.navTo(`${url}?data=${item[idName]}`)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.m-list-note {
  padding-top: $common-padding;
  > view {
    display: flex;
    height: 80rpx + $common-padding * 2;
    margin-bottom: $common-padding;
    padding: $common-padding;
    background: $uni-bg-color;
    .u-lf {
      flex-grow: 1;
      width: 50%;
      .u-tit {
        @include clamp;
        margin-bottom: 10rpx;
        color: $common-font-color;
        font-size: $common-font-size;
      }
      .u-time {
        color: $common-font-color-reduce;
        font-size: $common-font-size-min;
      }
    }
    .u-rt {
      width: 100rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: right;
      .icon-weibiaoti38 {
        color: $uni-text-color-disable;
      }
      .icon-dui {
        color: $uni-color-error;
      }
    }
  }
}
</style>
