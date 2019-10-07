import { setToken, getToken, removeToken } from '@/permission/token'
import { login, logout, getUserInfo } from '@/request/api/user'
import { resetRouter } from '@/router/router'

const state = {
  token: getToken(),
  roles: [],
  nickname: '',
  detail: {},
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_NICKNAME(state, nickname) {
    state.nickname = nickname
  },
  SET_DETAIL(state, detail) {
    state.detail = detail
  },
}

const actions = {
  async login({ commit }, loginInfo) {
    try {
      const { code, data } = await login(loginInfo)
      if (code === 2000) {
        commit('SET_TOKEN', data.token) // 将token存储到vuex
        setToken(data.token) // 将token缓存到cookie
      }
      return code
    } catch (err) {
      return err
    }
  },

  async getUserInfo({ commit }) {
    try {
      const { data } = await getUserInfo()
      const { roles, nickname } = data
      commit('SET_ROLES', roles)
      commit('SET_NICKNAME', nickname)
      commit('SET_DETAIL', data)
      return data
    } catch (err) {
      removeToken()
      return Promise.reject(err)
    }
  },

  async logout({ commit, state }) {
    await logout(state.token)
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken() // 移除本地token缓存
    resetRouter() // 重置路由，不然会出现路由重复的情况
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
