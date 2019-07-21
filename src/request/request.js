import Axios from 'axios';

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
  async errorNotify({
    title = '哎呀！', text = '请求出错啦！', color = 'danger', fixed = true, icon = 'clear',
  } = {}) {
    const { default: vm } = await import('@/main.js');
    vm.$vs.notify({
      title, text, color, fixed, icon,
    });
  },
  404(status, statusText) {
    this.errorNotify({ title: `${status}`, text: `找不到资源 - ${statusText}` });
  },
  500(status, statusText) {
    this.errorNotify({ title: `${status}`, text: `服务器出问题了 - ${statusText}` });
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
