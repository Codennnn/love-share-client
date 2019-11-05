import { getCartList } from '@/request/api/goods'

const state = {
  cartList: [],
}

const mutations = {
  SET_CART_LIST(state, carts) {
    state.cartList = carts
  },
}

const actions = {
  async getCartList({ commit }) {
    const { code, data } = await getCartList()
    if (code === 2000) {
      commit('SET_CART_LIST', data.cart_list)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    carts: state => state.cartList,
  },
}
