import Vue from 'vue';
import './element'; // 组件库

import lodash from 'lodash';
import animated from 'animate.css';

Vue.use(animated);
Object.defineProperty(Vue.prototype, '_', { value: lodash });
