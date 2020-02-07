import Vue from 'vue'
import store from '@/store/store'

// 判断是否为用户自身
Vue.directive('self', (el, binding) => {
  if (store.getters['user/userId'] === binding.value) {
    el.parentNode.removeChild(el) // 如果没有权限，则移除节点
  }
})
Vue.prototype.$self = (userId) => {
  if (store.getters['user/userId'] === userId) {
    return true
  }
  return false
}

// 判断用户是否已登录
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
