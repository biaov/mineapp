<template>
  <!-- 我要反馈 -->
  <view class="m-feedback-need">
    <view class="u-label">反馈标题</view>
    <view class="m-input">
      <input type="text" v-model="form.title" class="u-input" placeholder="请输入反馈标题" placeholder-style="color:#a4abb3;" :maxlength="totalNum1" />
      <view class="u-number">
        <text :class="number1 > totalNum1 ? 'danger' : ''">{{ number1 }}</text>
        /{{ totalNum1 }}
      </view>
    </view>
    <view class="u-label">反馈内容</view>
    <view class="m-text">
      <textarea class="u-textarea" v-model="form.content" placeholder="请输入反馈内容" placeholder-style="color:#a4abb3;" :maxlength="totalNum2"></textarea>
      <view class="u-number">
        <text :class="number2 > totalNum2 ? 'danger' : ''">{{ number2 }}</text>
        /{{ totalNum2 }}
      </view>
    </view>
    <view class="btn-default" @tap="onSubmit">提交</view>
  </view>
</template>
<script>
import InputBox from '@/components/InputBox'
import { GoFeedbackSubmit } from '@/api/user'
export default {
  components: {
    InputBox
  },
  data() {
    return {
      // 表单信息
      form: {
        title: '',
        content: ''
      },
      number1: 0, // 个性签名字数
      totalNum1: 16, // 限制超过字数
      number2: 0, // 个性签名字数
      totalNum2: 100 // 限制超过字数
    }
  },
  onLoad() {},
  computed: {
    // 获取标题值
    getTitle() {
      return this.form.title
    },
    // 获取内容值
    getContent() {
      return this.form.content
    }
  },
  methods: {
    // 点击提交按钮
    onSubmit() {
      const {
        totalNum1,
        totalNum2,
        form,
        returnBack,
        $api: { Msg, Loading, RequestMsg }
      } = this
      const { title, content } = form
      const lenTit = title.trim().length
      const lenCon = content.trim().length
      if (lenTit === 0 || lenTit === totalNum1) {
        // 标题长度校验
        Msg(`反馈标题不能为空且不能大于${totalNum1}`)
      } else if (lenCon === 0 || lenCon === totalNum2) {
        // 内容长度校验
        Msg(`反馈内容不能为空且不能大于${totalNum2}`)
      } else {
        Loading()
        // 请求后台
        GoFeedbackSubmit(form).then(res => {
          RequestMsg(res).then(() => {
            Msg('反馈成功')
            // 延迟返回
            setTimeout(() => {
              returnBack()
            }, 500)
          })
        })
      }
    }
  },
  watch: {
    // 监听标题值
    getTitle(value) {
      this.number1 = value.length
    },
    // 监听内容值
    getContent(value) {
      this.number2 = value.length
    }
  }
}
</script>
<style scoped lang="scss">
.m-feedback-need {
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
    margin-bottom: $common-padding;
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
  .m-text {
    width: 100%;
    border-radius: 10rpx;
    margin-bottom: $common-padding * 2;
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
