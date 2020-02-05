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
    if (data.address.receiver) {
      const res = await createOrder(data)
      return res
    }
    return { code: 5000 }
  },
}

export default action
