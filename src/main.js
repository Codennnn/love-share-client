import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from './store';

import './assets/iconfont/iconfont.css'; // 导入字体图标

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
