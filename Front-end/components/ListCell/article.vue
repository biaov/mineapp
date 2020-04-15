<template>
  <!-- 文章列表 -->
  <view class="m-list-article">
    <view v-for="(item,index) in list" :key="index" @tap="handleLi(item)">
      <image class="u-img" :src="item.src"></image>
      <view class="u-tit">{{item.title}}</view>
      <view class="u-time">{{item.createTime}}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: "ListArticle",
  props: {
    // 列表数据
    list: {
      type: Array,
      required: true
    },
    // 跳转地址
    url: {
      type: String,
      default: ""
    },
    // id类型名称
    idName: {
      type: String,
      default: "daid"
    }
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    // 点击列表
    handleLi(item) {
      const { url, idName } = this;
      // 判断是否允许跳转，默认不传不跳转
      if (!!url) {
        this.navTo(`${url}?data=${item[idName]}`);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.m-list-article {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > view {
    width: 49%;
    margin-bottom: 30rpx;
    .u-img {
      width: 100%;
      height: 240rpx;
      border-radius: 10rpx;
      margin-bottom: 10rpx;
      overflow: hidden;
    }
    .u-tit {
      @include common-height-min;
      @include clamp;
      color: $common-font-color;
      font-size: $common-font-size;
    }
    .u-time {
      color: $common-font-color-reduce;
      font-size: $common-font-size-min;
    }
  }
}
</style>