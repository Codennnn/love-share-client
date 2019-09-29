import Axios from 'axios'
import { Notification } from 'element-ui'
import { getToken } from '@/permission/token'

const service = Axios.create({
  baseURL: '/api',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

service.interceptors.request.use(
  (config) => {
    console.log('>>>>>>>>>>>>')

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
    title = '哎呀！', message = '请求出错啦！',
  } = {}) {
    Notification.error({
      title,
      message,
      duration: 0,
    })
  },
  401(status, statusText) {
    this.errorNotify({ title: `${status}`, message: `抱歉，您没有权限访问 - ${statusText}` })
  },
  404(status, statusText) {
    this.errorNotify({ title: `${status}`, message: `找不到资源 - ${statusText}` })
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
    console.log(res)
    console.log('<<<<<<<<<<<<')
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
