import Vue from 'vue'
import animated from 'animate.css' // css 动画库
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import './router/control'
import '@/layouts/theme' // 网站主题，样式

import '@/request/mock/mock' // mock模拟请求数据

Vue.use(animated)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
