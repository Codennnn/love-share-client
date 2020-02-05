import { createOrder } from '@/request/api/order'
import { getCategoryList } from '@/request/api/common'

const action = {
  async getCategoryList({ commit }) {
    const { code, data } = await getCategoryList()
    if (code === 2000) {
      commit('SET_CATEGORY_LIST', data.category_list)
    }
  },

  async createOrder(_, data) {
    const valid = Object.keys(data.address)
      .every(key => Object.prototype.hasOwnProperty.call(data.address, key))
      && data.goods_list
        .every(el => Object.keys(el)
          .every(key => Object.prototype.hasOwnProperty.call(el, key)))
    if (valid) {
      const res = await createOrder(data)
      return res
    }
    return { code: 5000 }
  },
}

export default action
