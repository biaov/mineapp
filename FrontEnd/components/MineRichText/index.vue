<template>
  <!-- 富文本 -->
  <view class='m-rich-text'>
    <view class='toolbar' @tap="format">
      <view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
      <view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
      <view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
      <view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
      <view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align" data-value="left"></view>
      <view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align" data-value="center"></view>
      <view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align" data-value="right"></view>
      <view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align" data-value="justify"></view>
      <view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight" data-value="2"></view>
      <view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing" data-value="2em"></view>
      <view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop" data-value="20px"></view>
      <view :class="formats.marginBottom? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px"></view>
      <view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
      <view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
      <view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize" data-value="24px"></view>

      <view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color" data-value="#0000ff"></view>
      <view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>

      <view class="iconfont icon-date" @tap="insertDate"></view>
      <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
      <view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list" data-value="ordered"></view>
      <view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list" data-value="bullet"></view>
      <view class="iconfont icon-undo" @tap="undo"></view>
      <view class="iconfont icon-redo" @tap="redo"></view>

      <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
      <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
      <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
      <view class="iconfont icon-charutupian" @tap="insertImage"></view>
      <view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header" :data-value="1"></view>
      <view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script" data-value="sub"></view>
      <view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script" data-value="super"></view>
      <view class="iconfont icon-shanchu" @tap="clear"></view>
      <view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>

    </view>

    <editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize @statuschange="onStatusChange" @ready="onEditorReady" @input="onChange">
    </editor>
  </view>

  </view>
</template>

<script>
import { GoUploadImg } from "@/api/public";
export default {
  name: "MineRichText",
  data() {
    return {
      formats: {}
    };
  },
  methods: {
    // 编辑器初始化完成时触发
    onEditorReady() {
      uni
        .createSelectorQuery()
        .select("#editor")
        .context(res => {
          this.editorCtx = res.context;
        })
        .exec();
    },
    // 之前
    undo() {
      this.editorCtx.undo();
    },
    // 之后
    redo() {
      this.editorCtx.redo();
    },
    // 格式化icon
    format(e) {
      let { name, value } = e.target.dataset;
      if (!name) return;
      this.editorCtx.format(name, value);
    },
    // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
    onStatusChange(e) {
      const formats = e.detail;
      this.formats = formats;
    },
    // 插入一条水平线
    insertDivider() {
      this.editorCtx.insertDivider();
    },
    // 点击清理icon
    clear() {
      this.editorCtx.clear();
    },
    // 移除格式化
    removeFormat() {
      this.editorCtx.removeFormat();
    },
    // 插入日期
    insertDate() {
      const date = new Date();
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      this.editorCtx.insertText({
        text: formatDate
      });
    },
    // 点击图片icon
    insertImage() {
      // 选择图片
      this.$api.SelectImg().then(res => {
        this.$api.Loading();
        // 上传图片
        GoUploadImg(res.tempFilePaths[0]).then(res2 => {
          this.$api.RequestMsg(res2).then(data => {
            let src = data.url;
            this.editorCtx.insertImage({
              src,
              alt: "图像"
            });
          });
        });
      });
    },
    // 输入时
    onChange(e) {
      this.$emit("on-change", e.detail.html);
    }
  },
  onLoad() {
    uni.loadFontFace({
      family: "Pacifico",
      source: 'url("https://sungd.github.io/Pacifico.ttf")'
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/utils/styles/editor-icon.css";
$padding: 10rpx;
.m-rich-text {
  padding: $padding * 2;
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .iconfont {
      margin: $padding;
      padding: $padding;
      color: $common-font-color;
      font-size: $common-font-size-large;
    }
  }
  .ql-container {
    width: 100%;
    min-height: 40vh;
    height: auto;
    margin-top: $common-padding;
    padding: $padding * 2;
    background: #fff;
    text-align: justify;
    caret-color: $common-color;
    color: $common-font-color;
    font-size: $common-font-size;
  }
  .ql-active {
    color: $common-color;
  }
}
</style>
