<template>
  <!-- 昵称 -->
  <view class="m-nickname">
    <view class="u-label">设置昵称</view>
    <view class="m-input">
      <input type="text" v-model="nickname" class="u-input" placeholder="请输入昵称" placeholder-style="color:#a4abb3;" :maxlength="totalNum">
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
      nickname: "", // 昵称
      number: 0, // 个性签名字数
      totalNum: 10 // 限制超过字数
    };
  },
  onLoad(options) {
    this.nickname = options.data;
  },
  methods: {
    // 点击修改按钮
    onEdit() {
      const { nickname, totalNum } = this;
      let len = nickname.trim().length;
      if (len === 0) {
        this.$api.Msg("昵称不能为空");
      } else if (len > totalNum) {
        this.$api.Msg(`昵称长度不能大于${totalNum}位`);
      } else {
        this.$api.Loading();
        GoEditInfo({ nickname }).then(res => {
          this.$api.RequestMsg(res).then(data => {
            this.$api.Msg("修改成功");
            setTimeout(() => {
              this.returnBack();
            }, 500);
          });
        });
      }
    }
  },
  watch: {
    // 监听个性签名
    nickname(value) {
      this.number = value.length;
    }
  }
};
</script>
<style scoped lang="scss">
.m-nickname {
  padding: $common-padding;
  .u-label {
    margin-bottom: $common-padding;
    color: $common-font-color;
    font-size: $common-font-size;
    font-weight: bold;
  }
  .m-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 10rpx;
    margin-bottom: $common-padding * 2;
    background: $uni-bg-color-content;
    padding: 0 $common-padding;
    .u-input {
      flex-grow: 1;
      width: 50%;
      height: 88rpx;
      line-height: 88rpx;
      caret-color: $common-color;
      color: $common-font-color;
      font-size: $common-font-size;
    }
    .u-number {
      width: 80rpx;
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