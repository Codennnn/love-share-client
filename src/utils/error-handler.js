/* eslint no-underscore-dangle: 0 */
import request from '@/request/request'
import { errorNotify } from '@/utils/util'

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
  errorNotify({ message: err.message })
  request({
    url: '/log/add',
    method: 'post',
    data: {
      err: {
        stack: err.stack,
        msg: err.message,
      },
      detail,
      info,
    },
  })
}
