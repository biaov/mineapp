/*!
 * Copyright (c) Author biaov<biaov@qq.com>
 * Date 2020-03-05
 */

import Vue from 'vue'
import App from './App'
import store from './store'
import './utils'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
