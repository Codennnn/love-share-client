import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/plugins'; // 插件，第三方组件等
import '@/styles/index.scss'; // 全局样式
import '@/assets/iconfont/iconfont.css'; // 字体图标

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
