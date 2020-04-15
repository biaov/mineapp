<template>
  <!-- 功能模块 -->
  <view class="m-function">
    <uni-grid :column="3" :highlight="true" @change="onChange">
      <uni-grid-item v-for="(item, index) in listData" :index="index" :key="index">
        <icon-text :icon="item.icon" :iconColor="item.iconColor" :text="item.text"></icon-text>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>
<script>
import UniGrid from "@/components/UniGrid";
import UniGridItem from "@/components/UniGrid/UniGridItem";
import IconText from "@/components/UniGrid/IconText";
export default {
  components: {
    UniGrid,
    UniGridItem,
    IconText
  },
  data() {
    return {
      // 列表数据
      listData: [
        // #ifndef H5
        {
          icon: "icon-scan",
          iconColor: "#01296f",
          text: "扫一扫"
        },
        // #endif
        // #ifdef APP-PLUE
        {
          icon: "icon-jieping",
          iconColor: "#a86dff",
          text: "截屏分享"
        },
        // #endif
        {
          icon: "icon-address",
          iconColor: "#56bcd6",
          text: "我的地址"
        }
      ]
    };
  },
  onLoad() {},
  methods: {
    // 点击列表
    onChange(e) {
      // 条件判断点击第几个块
      switch (e.detail.index) {
        case 0:
          this.onScan();
          break;
        case 1:
          this.onScreenshots();
          break;
        case 2:
          this.onAddress();
          break;
      }
    },
    // 点击扫一扫
    onScan() {
      // #ifndef H5
      uni.scanCode({
        success: res => {
          this.$api.ShowModal(res.result);
        }
      });
      // #endif
    },
    // 点击截屏分享
    onScreenshots() {
      // #ifdef APP-PLUE
      this.$api.DrawScreen().then(imageUrl => {
        this.$api.ShowActionSheet(["分享给朋友", "分享到朋友圈"]).then(index => {
          let scene = index === 0 ? "WXSceneSession" : "WXSenceTimeline";
          // 分享图片
          uni.share({
            provider: "weixin",
            type: 2,
            scene,
            imageUrl,
            success: data => {
              this.$api.Msg("分享成功");
            },
            error: error => {
              this.$api.Msg("分享失败");
            }
          });
        });
      });
      // #endif
    },
    // 我的地址
    onAddress() {
      this.$api.Msg("暂未开放");
    }
  }
};
</script>
<style scoped lang="scss">
.m-function {
  padding: $common-padding;
}
</style>