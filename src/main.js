import Vue from 'vue'
import animated from 'animate.css' // css 动画库
import VueClipboard from 'vue-clipboard2' // 粘贴板
import dayjs from 'dayjs' // 日期格式化
import VueSocketIO from 'vue-socket.io' // socket.io
import VueFeather from 'vue-feather' // Feather 图标
import infiniteScroll from 'vue-infinite-scroll' // 无限滚动
import VContentmenu from 'v-contextmenu' // 右键菜单
import 'v-contextmenu/dist/index.css' // 右键菜单样式
import '@/directives' // 自定义指令
import {
  timeDiff, numFixed, cloneDeepWith, debounce,
} from '@/utils/util' // 时间差工具函数
import errorHandler from '@/utils/error-handler' // 错误处理函数

import App from './App.vue'
import store from './store/store'
import router from './router/router'

import 'dayjs/locale/zh-cn' // dayjs 语言包
import './router/control' // 路由控制
import '@/layouts/theme' // 网站主题，样式

// import '@/request/mock/mock' // 本地 mock 模拟请求数据

Vue.use(new VueSocketIO({
  connection: process.env.NODE_ENV === 'production' ? 'https://holdme.top' : 'http://127.0.0.1:7001',
}))

Vue.use(VContentmenu)
Vue.use(VueFeather)
Vue.use(animated)
Vue.use(VueClipboard)
Vue.use(infiniteScroll)
Vue.prototype.$dayjs = dayjs
Vue.prototype.$timeDiff = timeDiff
Vue.prototype.$numFixed = numFixed
Vue.prototype.$cloneDeepWith = cloneDeepWith
Vue.prototype.$debounce = debounce

Vue.config.errorHandler = errorHandler
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
