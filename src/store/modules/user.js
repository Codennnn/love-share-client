import { setToken, getToken, removeToken } from '@/utils/token'
import { signIn, signOut, getUserInfo } from '@/request/api/user'
import {
  getAddressList, addAddress, deleteAddress, updateAddress, setDefaultAddress,
} from '@/request/api/address'

const state = {
  token: getToken() || '',
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
  ADD_BEAN(state, value) {
    state.info.beans += value
  },
}

const actions = {
  async signIn({ commit, dispatch }, info) {
    const { code, data } = await signIn(info)
    if (code === 2000) {
      commit('SET_TOKEN', data.token) // 将 token 存储到 vuex
      setToken(data.token) // 将 token 缓存到 cookie

      dispatch('initValues')
    }
    return code
  },

  async signOut({ commit, state }) {
    await signOut(state.token)
    commit('SET_TOKEN', '')
    commit('SET_INFO', {})
    commit('SET_ADDRESS', [])
    commit('chat/SET_CONTACT_LIST', [], { root: true })
    commit('chat/SET_CHAT_DATA', {}, { root: true })
    removeToken() // 移除本地token缓存
    localStorage.removeItem('vuex')
  },

  async initValues({ dispatch }) {
    dispatch('getAddressList')
    dispatch('getUserInfo')
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
  getters: {
    token: state => state.token,
    userId: state => state.info._id,
    isFollowed: (state, getters) => id => getters.getFollows.includes(id),
  },
}
