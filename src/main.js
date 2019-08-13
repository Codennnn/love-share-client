import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router/router';
import i18n from './i18n/i18n';

import './router/control';
import '@/plugins'; // 插件，第三方组件等
import '@/config/theme'; // 网站主题，样式

import '@/request/mock/mock'; // mock模拟请求数据

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

export default vm;
