<template>
  <!-- 图片列表 -->
  <view class="m-list-picture">
    <view v-for="(item,index) in list" :key="item.id" @tap="onLi(item)">
      <image :src="item.src" mode="widthFix"></image>
    </view>
  </view>
</template>
<script>
export default {
  name: "ListPicture",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    // 点击列表
    onLi(item) {
      const { src } = item;
      // 预览图片
      uni.previewImage({
        urls: [src],
        longPressActions: {
          itemList: ["保存到相册", "发送给朋友", "分享到朋友圈"],
          success: data => {
            const Index = data.tapIndex;
            if (Index === 0) {
              // 保存图片到相册
              // #ifndef H5
              uni.saveImageToPhotosAlbum({
                filePath: src,
                success: () => {
                  this.$api.Msg("保存成功");
                }
              });
              // #endif
            } else {
              // #ifdef APP-PLUS
              let scene = Index === 1 ? "WXSceneSession" : "WXSenceTimeline";
              // 分享图片
              uni.share({
                provider: "weixin",
                type: 2,
                scene,
                imageUrl: src,
                success: data => {
                  this.$api.Msg("分享成功");
                },
                error: error => {
                  this.$api.Msg("分享失败");
                }
              });
              // #endif
            }
          },
          fail: err => {
            // this.$api.Msg(err.errMsg);
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.m-list-picture {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > view {
    width: 48%;
    border-radius: 8rpx;
    overflow: hidden;
    margin-bottom: $common-padding;
  }
}
</style>