import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'

import user from './modules/user'
import todo from './modules/todo'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    todo,
    permission,
  },

  state,
  mutations,
  actions,

  getters: {
    token(state) {
      return state.token
    },
  },
})
