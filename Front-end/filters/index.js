import Vue from "vue";
// 过滤demo
Vue.filter("filterDemo", value => {
  switch (value) {
    case 0:
      return "路人";
    case 1:
      return "小白";
    case 2:
      return "普通";
    case 3:
      return "黑铁";
    case 4:
      return "青铜";
    case 5:
      return "白银";
    case 6:
      return "黄金";
    case 7:
      return "铂金";
    case 8:
      return "钻石";
    case 9:
      return "大师";
    case 9:
      return "无敌";
  }
});