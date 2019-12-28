import { getUnreadNotices } from '@/request/api/notice'

const state = {
  unreadNotices: [],
}

const mutations = {
  SET_UNREAD_NOTICES(state, notices) {
    state.unreadNotices = notices
  },

  ADD_UNREAD_ITEM(state, notice) {
    state.unreadNotices.push(notice)
  },

  REMOVE_UNREAD_ITEM(state, id) {
    for (let i = 0; i <= state.unreadNotices.length; i += 1) {
      if (state.unreadNotices[i]._id === id) {
        state.unreadNotices.splice(i, 1)
        break
      }
    }
  },
}

const actions = {
  async getUnreadNotices({ commit }) {
    const { code, data } = await getUnreadNotices()
    if (code === 2000) {
      commit('SET_UNREAD_NOTICES', data.notice_list)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    unreadAmount: state => state.unreadNotices.length,
    unreadNoticesReverse: state => [...state.unreadNotices].reverse(),
    isUnread: state => id => state.unreadNotices.some(el => el._id === id),
  },
}
