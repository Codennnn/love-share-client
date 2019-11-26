import { setToken, getToken, removeToken } from '@/utils/token'
import {
  signIn, signOut, getUserInfo, getAddressList, addAddress,
  deleteAddress, updateAddress, setDefaultAddress,
} from '@/request/api/user'

const state = {
  token: getToken(),
  info: {},
  defaultAddress: '',
  addressList: [],
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_INFO(state, info) {
    state.info = info
  },
  SET_AVATAR(state, url) {
    state.info.avatar_url = url
  },
  SET_ADDRESS(state, list) {
    state.addressList = list
  },
  SET_DEFAULT_ADDRESS(state, id) {
    state.defaultAddress = id
  },
}

const actions = {
  async signIn({ commit }, info) {
    const { code, data } = await signIn(info)
    if (code === 2000) {
      commit('SET_TOKEN', data.token) // 将 token 存储到 vuex
      setToken(data.token) // 将 token 缓存到 cookie
    }
    return code
  },

  async signOut({ commit, state }) {
    await signOut(state.token)
    commit('SET_TOKEN', '')
    commit('SET_INFO', {})
    removeToken() // 移除本地token缓存
  },

  async getUserInfo({ commit }) {
    try {
      const { code, data } = await getUserInfo()
      if (code === 2000) {
        commit('SET_INFO', data.user_info)
      }
    } catch {
      removeToken()
    }
  },

  async getAddressList({ commit }) {
    const { code, data } = await getAddressList()
    if (code === 2000) {
      commit('SET_ADDRESS', data.address_list)
      commit('SET_DEFAULT_ADDRESS', data.default_address)
    }
  },

  async addAddress({ dispatch }, data) {
    const { code } = await addAddress(data)
    if (code === 2000) {
      await dispatch('getAddressList')
    }
  },

  async deleteAddress({ dispatch }, id) {
    const { code } = await deleteAddress({ address_id: id })
    if (code === 2000) {
      await dispatch('getAddressList')
    }
  },

  async updateAddress({ dispatch }, data) {
    const { code } = await updateAddress(data)
    if (code === 2000) {
      await dispatch('getAddressList')
    }
  },

  async setDefaultAddress({ commit }, id) {
    const { code } = await setDefaultAddress({ address_id: id })
    if (code === 2000) {
      commit('SET_DEFAULT_ADDRESS', id)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
