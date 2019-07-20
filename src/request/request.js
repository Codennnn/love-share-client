import Axios from 'axios';
import { Message } from 'element-ui';

const service = Axios.create({
  // baseURL: 'https://api',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
});

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

service.interceptors.request.use(
  (config) => {
    console.log('request start');
    return config;
  },
  (error) => {
    console.log('request error', error);
    Promise.reject(error);
  },
);

const errorHandler = {
  errorNotify({
    message = '出错啦！', duration = 0, showClose = true,
  } = {}) {
    Message.error({
      message, duration, showClose,
    });
  },
  404(status, text = '糟糕，出错啦！') {
    this.errorNotify({ message: `${status},${text}` });
  },
  500(status, text = '糟糕，出错啦！') {
    this.errorNotify({ message: `${status},${text}` });
  },
  default() {
    this.errorNotify();
  },
};

service.interceptors.response.use(
  (response) => {
    const res = response;
    console.log('>>>', res, '<<<');
    return res;
  },
  (error) => {
    console.log(error.response);
    const { status, statusText } = error.response;
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    Object.prototype.hasOwnProperty.call(errorHandler, status)
      ? errorHandler[status](status, statusText)
      : errorHandler.default();
    return Promise.reject(error);
  },
);

export default service;
