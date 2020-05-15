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
        {
          icon: "icon-scan",
          iconColor: "#01296f",
          text: "扫一扫"
        },
        {
          icon: "icon-jieping",
          iconColor: "#a86dff",
          text: "截屏分享"
        },
        {
          icon: "icon-address",
          iconColor: "#56bcd6",
          text: "我的地址"
        },
        {
          icon: "icon-shouquan",
          iconColor: "#ed7120",
          text: "微信授权"
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
        case 3:
          this.onAuthorize();
          break;
      }
    },
    // 点击扫一扫
    onScan() {
      const {
        $api: { ShowModal }
      } = this;
      // #ifdef H5
      ShowModal("此功能只有非H5端才能用");
      // #endif
      // #ifndef H5
      uni.scanCode({
        success: ({ result }) => {
          ShowModal(result);
        }
      });
      // #endif
    },
    // 点击截屏分享
    onScreenshots() {
      const {
        $api: { ShowModal, DrawScreen, ShowActionSheet, Msg }
      } = this;
      // #ifndef APP-PLUE
      ShowModal("此功能只有APP端才能用");
      // #endif
      // #ifdef APP-PLUE
      DrawScreen().then(imageUrl => {
        ShowActionSheet(["分享给朋友", "分享到朋友圈"]).then(index => {
          let scene = index === 0 ? "WXSceneSession" : "WXSenceTimeline";
          // 分享图片
          uni.share({
            provider: "weixin",
            type: 2,
            scene,
            imageUrl,
            success: data => {
              Msg("分享成功");
            },
            error: error => {
              Msg("分享失败");
            }
          });
        });
      });
      // #endif
    },
    // 我的地址
    onAddress() {
      this.$api.Msg("暂未开放");
    },
    // 微信授权
    onAuthorize() {
      const { $api, navTo } = this;
      // #ifndef MP-WEIXIN
      $api.ShowModal("此功能只有微信小程序端才能用");
      // #endif
      // #ifdef MP-WEIXIN
      uni.getSetting({
        success: ({ authSetting }) => {
          // 跳转到指定页面
          navTo(`/pages/function/authorize?data=${Object.keys(authSetting).length !== 0 && authSetting["scope.userInfo"]}`);
        }
      });
      // #endif
    }
  }
};
</script>
<style scoped lang="scss">
.m-function {
  padding: $common-padding;
  /* #ifdef MP-WEIXIN */
  icon-text {
    height: 100%;
  }
  /* #endif */
}
</style>