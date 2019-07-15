import Vue from 'vue';
import Vuex from 'vuex';

import todo from './modules/todo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
  },

  state: {
    token: '',
  },

  getters: {
    token(state) {
      return state.token;
    },
  },

  mutations: {

  },

  actions: {

  },
});
