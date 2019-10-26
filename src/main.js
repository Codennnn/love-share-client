import Vue from 'vue'
import animated from 'animate.css' // css 动画库
import VueClipboard from 'vue-clipboard2' // 粘贴板
import dayjs from 'dayjs' // 日期格式化
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import 'dayjs/locale/zh-cn' // dayjs 语言包
import './router/control' // 路由控制
import '@/layouts/theme' // 网站主题，样式
import '@/directives' // 自定义指令

import '@/request/mock/mock' // 本地 mock 模拟请求数据

Vue.use(animated)
Vue.use(VueClipboard)
Vue.prototype.$dayjs = dayjs
dayjs.locale('zh-cn')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
