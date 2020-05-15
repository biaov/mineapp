<template>
  <!-- 个性签名 -->
  <view class="m-signature">
    <view class="u-label">设置个性签名</view>
    <view class="m-text">
      <textarea class="u-textarea" v-model="signature" placeholder="请输入个性签名" placeholder-style="color:#a4abb3;" :maxlength="totalNum"></textarea>
      <view class="u-number"><text :class="number>totalNum?'danger':''">{{number}}</text>/{{totalNum}}</view>
    </view>
    <view class="btn-default" @tap="onEdit">修改</view>
  </view>
</template>
<script>
import { GoEditInfo } from "@/api/user";
export default {
  data() {
    return {
      signature: "", // 个性签名
      number: 0, // 个性签名字数
      totalNum: 30 // 限制超过字数
    };
  },
  onLoad({ data }) {
    this.signature = this.$api.EnDnCodeURL(data, true);
  },
  methods: {
    // 点击修改按钮
    onEdit() {
      const {
        signature,
        totalNum,
        returnBack,
        $api: { Msg, Loading, RequestMsg }
      } = this;
      let len = signature.trim().length;
      if (len === 0) {
        Msg("个性签名不能为空");
      } else if (len > totalNum) {
        Msg(`个性签名长度不能大于${totalNum}位`);
      } else {
        Loading();
        // 请求后台
        GoEditInfo({ signature }).then(res => {
          RequestMsg(res).then(data => {
            Msg("修改成功");
            setTimeout(() => {
              returnBack();
            }, 500);
          });
        });
      }
    }
  },
  watch: {
    // 监听个性签名
    signature(value) {
      this.number = value.length;
    }
  }
};
</script>
<style scoped lang="scss">
.m-signature {
  padding: $common-padding;
  .u-label {
    margin-bottom: $common-padding;
    color: $common-font-color;
    font-size: $common-font-size;
    font-weight: bold;
  }
  .m-text {
    width: 100%;
    border-radius: 10rpx;
    margin-bottom: $common-padding;
    background: $uni-bg-color-content;
    padding: 0 $common-padding;
    .u-textarea {
      display: block;
      width: 100%;
      padding-top: 20rpx;
      text-align: justify;
      caret-color: $common-color;
      color: $common-font-color;
      font-size: $common-font-size;
    }
    .u-number {
      height: 60rpx;
      text-align: right;
      color: $common-font-color-reduce;
      font-size: $common-font-size-min;
      .danger {
        color: $common-color;
      }
    }
  }
}
</style>