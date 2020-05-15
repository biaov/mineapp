<template>
  <!-- 首页 -->
  <view class="m-home">
    <Layout @on-refresh="loadData" :state="systemCrashState">
      <!-- 轮播图 -->
      <view class="m-banner">
        <slider-bar :info="sliderList" @on-click="hanldeSilder"></slider-bar>
      </view>
      <!-- 公告 -->
      <notice-roll :title="notice.title" :dnid="notice.dnid"></notice-roll>
      <!-- 模块类别 -->
      <view class="m-classify">
        <view v-for="item in classifyList" :key="item.id" @tap="handleLi(item)">
          <text class="iconfont u-icon" :class="item.icon"></text>
          <text class="u-txt">{{item.text}}</text>
        </view>
      </view>
      <!-- 热点推荐 -->
      <view class="m-hot">
        <view class="u-title">热点推荐</view>
        <no-data v-if="articleList.length===0"></no-data>
        <list-articel :list="articleList" url="/pages/imgtxt/details" v-else></list-articel>
      </view>
    </Layout>
  </view>
</template>

<script>
import Layout from "@/components/Layout";
import SliderBar from "@/components/SliderBar";
import NoticeRoll from "@/components/NoticeRoll";
import ListArticel from "@/components/ListCell/article";
import NoData from "@/components/NoData";
import { mapState } from "vuex";
import { GetCarousel } from "@/api";
import { GetNoticeList } from "@/api/public";
import { GetArticleList } from "@/api/imgtxt";
export default {
  components: {
    Layout,
    SliderBar,
    NoticeRoll,
    ListArticel,
    NoData
  },
  data() {
    return {
      systemCrashState: true, // 系统崩溃状态
      // 公告内容
      notice: {
        title: "暂无公告",
        dnid: 0
      },
      // 轮播图列表
      sliderList: [
        {
          icid: 1,
          href: "https://app.biaov.cn/mineapp/images/home/error.png"
        }
      ],
      // 模块类别列表
      classifyList: [
        {
          id: 1,
          icon: "icon-hot",
          text: "热点",
          url: "/pages/index/hot"
        },
        {
          id: 2,
          icon: "icon-picture",
          text: "图片",
          url: "/pages/function/picture"
        },
        {
          id: 3,
          icon: "icon-bijinotes23",
          text: "笔记",
          url: "/pages/user/noteList"
        },
        {
          id: 4,
          icon: "icon-gongneng",
          text: "功能",
          url: "/pages/function/index"
        }
      ],
      // 推荐文章
      articleList: []
    };
  },
  onLoad() {
    this.loadData();
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    // 加载数据
    loadData() {
      // 加载轮播图数据
      GetCarousel().then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.systemCrashState = false;
          this.sliderList = list;
        });
      });
      // 加载公告数据
      GetNoticeList().then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.notice = list[0];
        });
      });
      // 加载热点推荐
      GetArticleList({
        current: 1,
        count: 4
      }).then(res => {
        this.$api.RequestMsg(res, false).then(({ list }) => {
          this.articleList = list;
        });
      });
    },
    // 点击轮播图
    hanldeSilder(item) {
      this.$api.Msg("你点击了第" + item.icid + "张图片");
    },
    // 点击模块列表
    handleLi(item) {
      let { id, url } = item;
      // 判断是否是第三个且是否登录
      if (id === 3 && !this.isLogin) {
        url = "/pages/admin/login";
      }
      this.navTo(url);
    }
  }
};
</script>

<style lang="scss">
.m-home {
  width: 100vw;
  padding: $common-padding;
  .m-banner {
    margin-bottom: 40rpx;
    border-radius: 10rpx;
  }
  .m-classify {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
    margin-bottom: 20rpx;
    > view {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      height: 80rpx;
      .u-icon {
        margin-bottom: 10rpx;
        color: #f60;
        font-size: 48rpx;
      }
      .u-txt {
        color: $common-font-color;
        font-size: 28rpx;
      }
    }
  }
  .m-hot {
    .u-title {
      height: 72rpx;
      line-height: 72rpx;
      margin-bottom: 10rpx;
      color: $common-font-color-deep;
      font-size: $common-font-size-large;
      font-weight: 700;
    }
  }
}
</style>
