import { getCartList, addCartItem, removeCartItem } from '@/request/api/cart'

const state = {
  cartList: [],
}

const mutations = {
  SET_CART_LIST(state, carts) {
    state.cartList = carts
  },

  SET_ADDRESS(state, address) {
    state.address = address
  },
}

const actions = {
  async getCartList({ commit }) {
    const { code, data } = await getCartList()
    if (code === 2000) {
      commit('SET_CART_LIST', data.cart_list)
    }
  },

  async addCartItem({ dispatch }, goods_id) {
    const { code } = await addCartItem({ goods_id })
    if (code === 2000) {
      dispatch('getCartList')
    }
  },

  async removeCartItem({ dispatch }, goods_id) {
    const { code } = await removeCartItem({ goods_id })
    if (code === 2000) {
      dispatch('getCartList')
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    cartAmount: state => state.cartList.length,
    // 总运费
    deliveryCharges: (state) => {
      const charge = state.cartList.reduce((acc, curr) => acc + curr.delivery_charge, 0)
      if (charge === 0) {
        return '免费'
      }
      return charge
    },
    // 总付款
    amountPayable: (state) => {
      const amount = state.cartList.reduce((acc, curr) => acc + curr.price, 0)
      return amount
    },
    isInCart: state => id => state.cartList.some(item => item._id === id),
  },
}
