/* eslint no-underscore-dangle: 0, no-console: 0 */

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
  if (process.env.NODE_ENV !== 'production') {
    const baseStyle = 'padding:0.2rem 0.3rem;color:white;'
    const style1 = `${baseStyle}border-radius:1rem 0 0 1rem;background: rgb(53,73,94);`
    const style2 = `${baseStyle}border-radius:0 1rem 1rem 0;background: #EA5455;`
    console.log('%cVue%cerror', style1, style2, err)
  }

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
