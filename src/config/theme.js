import Vue from 'vue';
import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

import '@/assets/scss/base.scss'; // 全局样式
import '@/assets/iconfont/iconfont.css'; // 字体图标

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#7367F0',
      success: '#28C76F',
      danger: '#EA5455',
      warning: '#FF9F43',
      dark: '#1E1E1E',
    },
  },
});
