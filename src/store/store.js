import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import user from './modules/user'
import todo from './modules/todo'
import cart from './modules/cart'
import notice from './modules/notice'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    todo,
    cart,
    notice,
    chat,
  },

  state,
  getters,
  mutations,
  actions,

  plugins: [createPersistedState()],
})
