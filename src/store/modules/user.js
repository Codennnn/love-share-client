import { setToken, getToken, removeToken } from '@/utils/token'
import { signIn, signOut, getUserInfo } from '@/request/api/user'

const state = {
  token: getToken(),
  info: {},
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_INFO(state, info) {
    state.info = info
  },
}

const actions = {
  async signIn({ commit }, info) {
    try {
      const { code, data } = await signIn(info)
      if (code === 2000) {
        commit('SET_TOKEN', data.token) // 将 token 存储到 vuex
        setToken(data.token) // 将 token 缓存到 cookie
      }
      return code
    } catch (err) {
      return err
    }
  },

  async getUserInfo({ commit }) {
    try {
      const { data } = await getUserInfo()
      commit('SET_INFO', data.user_info)
      return data
    } catch (err) {
      removeToken()
      return Promise.reject(err)
    }
  },

  async signOut({ commit, state }) {
    await signOut(state.token)
    commit('SET_TOKEN', '')
    commit('SET_INFO', {})
    removeToken() // 移除本地token缓存
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
