import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import todo from './modules/todo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    todo,
  },

  state: {
    token: 'token',
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
