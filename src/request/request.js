import Axios from 'axios'
import Qs from 'qs'
import { Notification } from 'element-ui'
import { getToken } from '@/utils/token'

const service = Axios.create({
  // baseURL: '/api',
  baseURL: process.env.NODE_ENV === 'production' ? 'http://129.204.137.172/api' : '/api',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' }),
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

service.interceptors.request.use(
  (config) => {
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
    title = '哎呀！', message = '请求出错啦！', duration = 3500,
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
    this.errorNotify({ title: `${status}`, message: '登录过期，请重新登录~', duration: 3000 })
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
    const { data } = response
    const { code, msg } = data
    if (code !== 2000) {
      errorHandler.errorNotify({
        title: `错误代码 - ${code}`,
        message: msg,
        duration: 5000,
      })
    }
    return data
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
