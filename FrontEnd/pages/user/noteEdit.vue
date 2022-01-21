<template>
  <!-- 写笔记 -->
  <view class="m-note-edit">
    <view class="u-label">笔记标题</view>
    <view class="m-input">
      <input type="text" v-model="form.title" class="u-input" placeholder="请输入笔记标题" placeholder-style="color:#a4abb3;" :maxlength="totalNum" />
      <view class="u-number">
        <text :class="number > totalNum ? 'danger' : ''">{{ number }}</text>
        /{{ totalNum }}
      </view>
    </view>
    <view class="u-label">笔记内容</view>
    <view class="m-text">
      <!-- <editor class="u-editor" placeholder="开始输入..." @blur="onChange"></editor> -->
      <mine-rich-text @on-change="onChange"></mine-rich-text>
    </view>
    <view class="btn-default" @tap="onSubmit">提交</view>
  </view>
</template>
<script>
import InputBox from '@/components/InputBox'
import MineRichText from '@/components/MineRichText'
import { GoNoteSubmit } from '@/api/user'
export default {
  components: {
    InputBox,
    MineRichText
  },
  data() {
    return {
      // 表单信息
      form: {
        title: '',
        content: ''
      },
      number: 0, // 个性签名字数
      totalNum: 16 // 限制超过字数
    }
  },
  onLoad() {},
  computed: {
    // 获取标题值
    getTitle() {
      return this.form.title
    }
  },
  methods: {
    // 当编辑器失去焦点时，触发
    onChange(value) {
      this.form.content = value
    },
    // 点击提交按钮
    onSubmit() {
      const {
        totalNum,
        returnBack,
        form: { title, content },
        $api: { Msg, Loading, RequestMsg }
      } = this
      const lenTit = title.trim().length
      if (lenTit === 0 || lenTit === totalNum) {
        // 标题长度校验
        Msg(`笔记标题不能为空且不能大于${totalNum}`)
      } else {
        Loading()
        GoNoteSubmit(this.form).then(res => {
          RequestMsg(res).then(data => {
            Msg('提交成功')
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
      this.number = value.length
    }
  }
}
</script>
<style scoped lang="scss">
.m-note-edit {
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
    // padding: 20rpx $common-padding 0;
  }
}
</style>
