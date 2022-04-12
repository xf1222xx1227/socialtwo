import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/app.css'   //css初始化
// import echarts from "echarts"

import api from './api/index'


Vue.prototype.$api = api;

Vue.config.productionTip = false;

// Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
