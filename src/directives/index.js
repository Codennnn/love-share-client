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

// 判断用户是否已浏览过
const validate = () => { throw new Error('$viewed: id为必选参数') }
Vue.prototype.$viewed = (id = validate()) => {
  const viewedList = JSON.parse(localStorage.getItem('viewed_list')) || []
  if (viewedList.includes(id)) {
    return 1
  }
  viewedList.push(id)
  localStorage.setItem('viewed_list', JSON.stringify(viewedList))
  return 0
}
