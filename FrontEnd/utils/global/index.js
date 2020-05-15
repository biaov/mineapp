import Vue from "vue";
import Api from "./function";
import Variable from "./variable";
import TemplateApi from "./template"
import "@/filters";
Vue.prototype.$api = Api; // 全局方法
Vue.prototype.$var = Variable; // 全局变量
// 循环遍历，把方法插入到Vue原型对象中去
for (let i in TemplateApi) {
  Vue.prototype[i] = TemplateApi[i];
}