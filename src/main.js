// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './utils/request'

import '@/styles/index.scss' // global css
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import './icons' // icon
// import './mock' // simulation data

Vue.use(Element)

Vue.config.productionTip = false
// Vue实例添加axios方法
Vue.prototype.request = request

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
