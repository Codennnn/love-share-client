import Vue from 'vue'

import {
  getContactList, getChatData, getContactInfo, addContact, deleteContact,
} from '@/request/api/chat'

const state = {
  activeChatUser: '',
  activeChatNickname: '',
  contactList: [],
  chatSearchQuery: '',
  chats: {},
  showChatbox: false, // 是否显示聊天框
}

const mutations = {
  SET_ACTIVE_CHAT_USER(state, { _id = '', nickname = '' }) {
    state.activeChatUser = _id
    state.activeChatNickname = nickname
  },

  SET_CONTACT_LIST(state, contactList) {
    state.contactList = contactList
  },

  SET_CHAT_DATA(state, chats) {
    state.chats = chats
  },

  SEND_CHAT_MESSAGE(state, msg) {
    state.chats[msg.target].msg.push(msg)
  },

  RECEIVE_CHAT_MESSAGE(state, msg) {
    if (state.chats[msg.target]) {
      state.chats[msg.target].msg.push(msg)
    } else {
      Vue.set(state.chats, msg.target, { msg: [msg] })
    }
  },

  SET_CHAT_OPEN(state) {
    state.showChatbox = true
  },

  SET_CHAT_CLOSE(state) {
    state.showChatbox = false
  },

  ADD_CONTACT(state, contact) {
    state.contactList.push(contact)
    Vue.set(state.chats, contact._id, { msg: [] })
  },

  MARK_SEEN_ALL_MESSAGES(state, payload) {
    payload.chatData.msg.forEach((msg) => {
      msg.is_seen = true
    })
  },
}

const actions = {
  async initChat({ dispatch }) {
    await Promise.all([
      dispatch('getContactList'),
      dispatch('getChatData'),
    ])
  },

  async addContact({ dispatch }, contact_id) {
    const { code } = await addContact({ contact_id })
    if (code === 2000) {
      await dispatch('initChat')
    } else {
      throw new Error('添加联系人出错')
    }
  },

  async deleteContact({ dispatch }, contact_id) {
    const { code } = await deleteContact({ contact_id })
    if (code === 2000) {
      await dispatch('initChat')
    } else {
      throw new Error('删除联系人出错')
    }
  },

  async getContactList({ commit }) {
    const { code, data } = await getContactList()
    if (code === 2000) {
      commit('SET_CONTACT_LIST', data.contact_list)
    }
  },

  async getChatData({ commit }) {
    const { code, data } = await getChatData()
    if (code === 2000) {
      commit('SET_CHAT_DATA', data.chats)
    }
  },

  async receiveMessage({ getters, commit }, msg) {
    if (!getters.isInChat(msg.target)) {
      const { code, data } = await getContactInfo({ user_id: msg.target })
      if (code === 2000) {
        commit('ADD_CONTACT', data.contact_info)
        commit('RECEIVE_CHAT_MESSAGE', msg)
      }
    } else {
      commit('RECEIVE_CHAT_MESSAGE', msg)
    }
  },

  markSeenAllMessages({ getters, commit }, id) {
    const payload = { id }
    payload.chatData = getters.chatDataOfUser(payload.id)
    commit('MARK_SEEN_ALL_MESSAGES', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    chatDataOfUser: state => id => state.chats[id],

    getContactList: (state, getters) => state.contactList
      .sort((x, y) => {
        const timeX = getters.chatLastMessaged(x._id)?.time || 0
        const timeY = getters.chatLastMessaged(y._id)?.time || 0
        return (timeY - timeX)
      }),

    chatLastMessaged: (state, getters) => (id) => {
      if (getters.chatDataOfUser(id)) {
        return getters.chatDataOfUser(id).msg.slice(-1)[0]
      }
      return {}
    },

    chatUnseenMessages: (state, getters) => (id) => {
      let unseenMsg = 0
      const chatData = getters.chatDataOfUser(id)
      if (chatData) {
        chatData.msg.map((msg) => {
          if (!msg.is_seen && !msg.isSent) {
            unseenMsg += 1
          }
          return ''
        })
      }
      return unseenMsg
    },

    isInChat: state => id => Object.prototype.hasOwnProperty.call(state.chats, id),
  },
}
