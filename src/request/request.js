import Axios from 'axios';
import vm from '@/main';

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
    title = 'Error', color = 'danger', text = '出错啦！', fixed = true, icon = 'clear',
  } = {}) {
    vm.$vs.notify({
      title, color, text, fixed, icon,
    });
  },
  404(status, text = '糟糕，出错啦！') {
    return this.errorNotify({ title: status, text });
  },
  500(status, text = '糟糕，出错啦！') {
    return this.errorNotify({ title: status, text });
  },
};

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(response);
    return res;
  },
  (error) => {
    console.log(error.response);
    const { status, statusText } = error.response;
    errorHandler[status](status, statusText);
    return Promise.reject(error);
  },
);

export default service;
