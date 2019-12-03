import Vue from 'vue'
import Axios from 'axios'
import { Notification } from 'element-ui'
import { getToken } from '@/utils/token'

Vue.prototype.$axios = Axios

const service = Axios.create({
  baseURL: '/api',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

service.interceptors.request.use(
  (config) => {
    // console.log('>>>>>>>>>>>>')

    // 每次请求都带上token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.log('######', error, '######')
    Promise.reject(error)
  },
)

const errorHandler = {
  errorNotify({
    title = '哎呀！', message = '请求出错啦！', duration = 3000,
  } = {}) {
    Notification.error({ title, message, duration })
  },
  400(status, statusText) {
    this.errorNotify({ title: `${status}`, message: `请求的参数错误 - ${statusText}` })
  },
  401(status, statusText) {
    this.errorNotify({ title: `${status}`, message: `抱歉，您没有权限访问 - ${statusText}` })
  },
  404(status, statusText) {
    this.errorNotify({ title: `${status}`, message: `找不到资源 - ${statusText}` })
  },
  418(status) {
    this.errorNotify({ title: `${status}`, message: '登录过期，请重新登录~', duration: '3000' })
  },
  500(status, statusText) {
    this.errorNotify({ title: `${status}`, message: `服务器出问题了 - ${statusText}` })
  },
  default() {
    this.errorNotify()
  },
}

service.interceptors.response.use(
  (response) => {
    const res = response
    // console.log(`%c${res.config.url}`, 'color: green;')
    // console.log(res.data)
    // console.log('<<<<<<<<<<<<')
    return res.data
  },
  (error) => {
    console.log(error, error.response)
    console.log('<<<<<<<<<<<<')
    const { status = 'default', statusText } = error.response
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    Object.prototype.hasOwnProperty.call(errorHandler, status)
      ? errorHandler[status](status, statusText)
      : errorHandler.default()
    return Promise.reject(error)
  },
)

export default service
