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

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(response);

    return res;
  },
  (error) => {
    vm.$vs.notify({
      title: '404',
      color: 'danger',
      text: '请求出错啦！',
      time: 4000,
      icon: 'clear',
    });
    return Promise.reject(error);
  },
);

export default service;
