import Vue from 'vue'
import store from '@/store/store'

// 按钮级别的权限控制指令
Vue.directive('auth', {
  inserted(el, binding) {
    const { value = ['super_admin'] } = binding
    const { roles } = store.getters

    const hasPermission = roles.some(role => value.includes(role))
    if (!hasPermission) {
      el.parentNode.removeChild(el) // 如果没有权限，则移除节点
    }
  },
})

Vue.prototype.$auth = (value = ['super_admin']) => {
  const { roles } = store.getters
  return roles.some(role => value.includes(role))
}
