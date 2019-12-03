import Vue from 'vue'
import animated from 'animate.css' // css 动画库
import VueClipboard from 'vue-clipboard2' // 粘贴板
import dayjs from 'dayjs' // 日期格式化
import VueSocketIO from 'vue-socket.io'

import App from './App.vue'
import store from './store/store'
import router from './router/router'

import 'dayjs/locale/zh-cn' // dayjs 语言包
import './router/control' // 路由控制
import '@/layouts/theme' // 网站主题，样式

// import '@/request/mock/mock' // 本地 mock 模拟请求数据

Vue.use(new VueSocketIO({
  connection: 'http://127.0.0.1:7001',
}))

Vue.use(animated)
Vue.use(VueClipboard)
Vue.prototype.$dayjs = dayjs

Vue.directive('login', {
  inserted(el) {
    if (!store.state.user.token) {
      el.parentNode.removeChild(el) // 如果没有权限，则移除节点
    }
  },
})
Vue.prototype.$login = () => {
  if (store.state.user.token) {
    return true
  }
  return false
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
