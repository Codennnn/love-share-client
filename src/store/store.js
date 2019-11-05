import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import user from './modules/user'
import todo from './modules/todo'
import cart from './modules/cart'
import chat from './modules/chat'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    todo,
    cart,
    chat,
    permission,
  },

  state,
  getters,
  mutations,
  actions,
})
