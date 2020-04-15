<template>
  <!-- 模态框-热更新组件 -->
  <view class="m-mask" :class="isShowMask?'show':''" v-if="isMask">
    <view class="m-picker">
      <view class="u-tit">{{title}}</view>
      <mine-progress :progress="progress"></mine-progress>
      <view class="u-txt">{{progress}}%</view>
    </view>
  </view>

</template>
<script>
import MineProgress from "@/components/MineProgress";
import { GetUpdateInfo } from "@/api/public";
export default {
  name: "HotUpdate",
  props: {
    // 是否显示更新
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MineProgress
  },
  data() {
    return {
      title: "更新中...", // 显示标题
      progress: 0, // 进度条
      isShowMask: false, // 是否显示状态
      isMask: false // 是否显示模态框
    };
  },
  onLoad() {},
  methods: {
    // 热更新
    hotUpdate() {
      this.$api.VersionInfo().then(widgetInfo => {
        GetUpdateInfo().then(res => {
          this.$api.RequestMsg(res).then(({ version, downUrl }) => {
            if (version != widgetInfo.version) {
              this.$api
                .ShowModal(`发现新版本${version}，点击确定即可更新！`, "提示")
                .then(() => {
                  this.showModal();
                  let downloadTask = uni.downloadFile({
                    url: downUrl,
                    success: downloadResult => {
                      if (downloadResult.statusCode === 200) {
                        plus.runtime.install(
                          downloadResult.tempFilePath,
                          {
                            force: false
                          },
                          () => {
                            plus.runtime.restart();
                          },
                          error => {
                            this.$api.msg("安装失败");
                            // console.error(error);
                          }
                        );
                      }
                    }
                  });
                  downloadTask.onProgressUpdate(res => {
                    let progressVal = res.progress;
                    this.progress = progressVal;
                    if (progressVal == 100) {
                      this.hideModal();
                    }
                  });
                })
                .catch(() => {
                  this.$emit("on-cancel");
                });
            } else {
              this.$api
                .ShowModal("当前已是最新版本", "提示")
                .then(() => {})
                .catch(() => {
                  this.$emit("on-cancel");
                });
            }
          });
        });
      });
    },
    // 显示模态框
    showModal() {
      this.isMask = true;
      setTimeout(() => {
        this.isShowMask = true;
      }, 100);
    },
    // 隐藏模态框
    hideModal() {
      this.isShowMask = false;
      setTimeout(() => {
        this.isMask = false;
      }, 400);
    }
  },
  watch: {
    // 监听是否更新
    isUpdate() {
      this.hotUpdate();
    }
  }
};
</script>
<style scoped lang="scss">
.m-mask {
  .m-picker {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    border-radius: 10rpx;
    padding: 42rpx 30rpx;
    background: #fff;
    transform: translate(-50%, -50%) scale(0);
    transition: all 0.4s;

    @mixin same-height {
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      color: #666;
      font-weight: 500;
    }
    .u-tit {
      @include same-height;
      margin-bottom: 40rpx;
      font-size: 34rpx;
    }
    .u-txt {
      @include same-height;
      margin-top: 30rpx;
      font-size: 30rpx;
    }
  }
  &.show .m-picker {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>