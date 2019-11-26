import { getCategoryList } from '@/request/api/common'

const action = {
  async getCategoryList({ commit }) {
    const { code, data } = await getCategoryList()
    if (code === 2000) {
      commit('SET_CATEGORY_LIST', data.category_list)
    }
  },
}

export default action
