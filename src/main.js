import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/plugins'; // 插件，第三方组件等
import '@/config/theme'; // 网站主题，样式

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
