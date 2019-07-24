import Vue from 'vue';
import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css'; // Vuesax 样式
import 'material-icons/iconfont/material-icons.css';

import '@/assets/scss/reset.scss'; // 覆盖默认样式
import '@/assets/scss/custom.scss'; // 常用样式
import '@/assets/scss/tailwind.scss'; // tailwind 样式
import '@/assets/iconfont/iconfont.css'; // 阿里云字体图标

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
