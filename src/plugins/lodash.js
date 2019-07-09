import Vue from 'vue';
import lodash from 'lodash';

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });
