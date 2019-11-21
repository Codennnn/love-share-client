import { getNoticeList } from '@/request/api/notice'

const state = {
  noticeList: [],
}

const mutations = {
  SET_NOTICE_LIST(state, notices) {
    state.noticeList = notices
  },
}

const actions = {
  async getNoticeList({ commit }) {
    const { code, data } = await getNoticeList()
    if (code === 2000) {
      commit('SET_NOTICE_LIST', data.notice_list)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    noticeAmount: state => state.noticeList.length,
  },
}
