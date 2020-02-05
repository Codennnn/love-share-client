import {
  getCartList, addCartItem, removeCartItem, clearCartList,
} from '@/request/api/cart'

const state = {
  cartList: [],
  address: {},
  orderId: '',
}

const mutations = {
  SET_CART_LIST(state, carts) {
    state.cartList = carts
  },

  SET_ADDRESS(state, address) {
    state.address = address
  },

  SET_ORDER_ID(state, id) {
    state.orderId = id
  },
}

const actions = {
  async getCartList({ commit }) {
    const { code, data } = await getCartList()
    if (code === 2000) {
      commit('SET_CART_LIST', data.cart_list)
    }
  },

  async addCartItem({ dispatch, getters }, { amount, goods_id }) {
    if (!getters.isInCart(goods_id)) {
      const { code } = await addCartItem({ amount, goods_id })
      if (code === 2000) {
        dispatch('getCartList')
      }
    }
  },

  async removeCartItem({ dispatch }, cart_id) {
    const { code } = await removeCartItem({ cart_id })
    if (code === 2000) {
      dispatch('getCartList')
    }
  },

  async clearCartList({ commit, dispatch, state }) {
    const cart_id_list = state.cartList.map(el => el._id)
    const { code } = await clearCartList({ cart_id_list })
    if (code === 2000) {
      commit('SET_CART_LIST', [])
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
    // 购物车商品数量
    cartAmount: state => state.cartList.length,
    // 总运费
    deliveryCharges: (state) => {
      const charge = state.cartList.reduce((acc, curr) => acc + curr.goods.delivery_charge, 0)
      if (charge === 0) {
        return '免费'
      }
      return charge
    },
    // 总付款
    amountPayable: state => state.cartList.reduce(
      (acc, curr) => {
        if (curr.goods.status === 1) {
          return acc + curr.goods.price * curr.amount
        }
        return acc
      },
      0,
    ),
    // 有效的商品
    validCartList: state => state.cartList.filter(li => li.goods.status === 1),
    isInCart: state => id => state.cartList.some(item => item.goods._id === id),
  },
}
