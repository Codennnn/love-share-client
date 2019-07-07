import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoPopupActive: false,
  },

  mutations: {
    active(state, payload) { state.todoPopupActive = payload.popupActive; },
  },

  actions: {

  },
});
