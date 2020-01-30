import Vue from 'vue'
import store from '@/store/store'

Vue.directive('self', (el, binding) => {
  if (store.getters['user/getUserId'] === binding.value) {
    el.parentNode.removeChild(el) // 如果没有权限，则移除节点
  }
})
Vue.prototype.$self = (userId) => {
  if (store.getters['user/getUserId'] === userId) {
    return true
  }
  return false
}
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
