<template>
  <view class="uni-swiper__warp">
    <swiper class="swiper-box" :autoplay="true" @change="change" :circular="true">
      <swiper-item v-for="(item,index) in info" :key="index">
        <view class="swiper-item" @tap="handleLi(item)">
          <image :src="item.href" mode="aspectFill" />
        </view>
      </swiper-item>
    </swiper>
    <view v-if="mode === 'default'" :style="{'bottom':dots.bottom + 'px'}" class="uni-swiper__dots-box">
      <view v-for="(item,index) in info" :style="{
        'width': (index === current? dots.width*2:dots.width ) + 'px','height':dots.width/3 +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border-radius':'0px'}" :key="index" class="uni-swiper__dots-item uni-swiper__dots-bar" />
    </view>
    <view v-if="mode === 'dot'" :style="{'bottom':dots.bottom + 'px'}" class="uni-swiper__dots-box">
      <view v-for="(item,index) in info" :style="{
        'width': dots.width + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}" :key="index" class="uni-swiper__dots-item" />
    </view>
    <view v-if="mode === 'round'" :style="{'bottom':dots.bottom + 'px'}" class="uni-swiper__dots-box">
      <view v-for="(item,index) in info" :class="[index === current&&'uni-swiper__dots-long']" :style="{
		    'width':(index === current? dots.width*3:dots.width ) + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}" :key="index" class="uni-swiper__dots-item " />
    </view>
    <view v-if="mode === 'nav'" :style="{'background-color':dotsStyles.backgroundColor}" class="uni-swiper__dots-box uni-swiper__dots-nav">
      <view :style="{'color':dotsStyles.color}" class="uni-swiper__dots-nav-item">{{ (current+1)+"/"+info.length }}
        {{ info[current][field] }}</view>
    </view>
    <view v-if="mode === 'indexes'" :style="{'bottom':dots.bottom + 'px'}" class="uni-swiper__dots-box">
      <view v-for="(item,index) in info" :style="{
        'width':dots.width + 'px','height':dots.height +'px' ,'color':index === current?dots.selectedColor:dots.color,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}" :key="index" class="uni-swiper__dots-item uni-swiper__dots-indexes">{{ index+1 }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "SliderBar",
  props: {
    // 信息数据
    info: {
      type: Array,
      default() {
        return [];
      }
    },
    // 点的样式
    dotsStyles: {
      type: Object,
      default() {
        return {};
      }
    },
    // 类型 ：default(默认) indexes long nav
    mode: {
      type: String,
      default: "default" // default dot round nav indexes
    },
    // 只在 nav 模式下生效，变量名称
    field: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      current: 0, // 当前索引
      dots: {
        width: 8,
        height: 8,
        bottom: 10,
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, .3)",
        border: "1px rgba(255, 255, 255, .3) solid",
        selectedBackgroundColor: "rgba(255, 255, 255, 1)",
        selectedBorder: "1px rgba(255, 255, 255, 1) solid"
      }
    };
  },
  methods: {
    // 轮播图改变时
    change(e) {
      this.current = e.detail.current;
    },
    // 点击列表项
    handleLi(item) {
      this.$emit("on-click", item);
    }
  },
  created() {
    if (this.mode === "indexes") {
      this.dots.width = 20;
      this.dots.height = 20;
    }
    this.dots = Object.assign(this.dots, this.dotsStyles); // 深拷贝
  }
};
</script>

<style scoped lang="scss">
view {
  font-size: 28rpx;
  line-height: inherit;
}

.active {
  border: 1px #000 solid;
}

.uni-swiper__warp {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .swiper-box {
    // height: 400rpx;
    .swiper-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      // border-radius:10rpx;
      overflow: hidden;
      background: #eee;
      color: #fff;
      > image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .uni-swiper__dots-box {
    position: absolute;
    bottom: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: box-sizing;
    width: 100%;
    .uni-swiper__dots-item {
      flex-shrink: 0;
      width: 16rpx;
      border-radius: 50%;
      margin-left: 12rpx;
      background: rgba(0, 0, 0, 0.3);
      transition: all 0.2s linear;
      &:first-child {
        margin: 0;
      }
    }
    .uni-swiper__dots-bar {
      border-radius: 100rpx;
    }
    .uni-swiper__dots-long {
      border-radius: 100rpx;
    }
    .uni-swiper__dots-indexes {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 24rpx;
    }
  }

  .uni-swiper__dots-default {
    border-radius: 50%;
  }

  .uni-swiper__dots-nav {
    bottom: 0;
    height: 80rpx;
    justify-content: flex-start;
    background: rgba(0, 0, 0, 0.2);
    box-sizing: box-sizing;
    overflow: hidden;
    .uni-swiper__dots-nav-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 28rpx;
      color: #fff;
      box-sizing: box-sizing;
      margin: 0 30rpx;
    }
  }
}
</style>