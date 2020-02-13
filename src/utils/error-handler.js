/* eslint no-underscore-dangle: 0 */
import { Notification } from 'element-ui'

export function errorNotify({
  title = '哎呀！', message = '出错啦！', duration = 5000,
} = {}) {
  Notification.error({ title, message, duration })
}

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root'
  const name = vm._isVue
    ? (vm.$options && vm.$options.name)
    || (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? `component <${name}>` : 'anonymous component')
    + (vm._isVue && vm.$options && vm.$options.__file
      ? ` at ${vm.$options && vm.$options.__file}`
      : '')
  )
}

export default (err, vm, info) => {
  const component_name = formatComponentName(vm)
  const detail = {
    component_name,
    route: vm?.$route?.fullPath,
  }
  console.log(err.message, detail, info)
  errorNotify({ message: err.message })
}
