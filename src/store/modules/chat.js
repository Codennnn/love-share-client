import Vue from 'vue'

import { getContactList } from '@/request/api/user'

const state = {
  contactList: [],
  chatSearchQuery: '',
  chats: {
    1: {
      isPinned: false,
      msg: [
        {
          textContent: '我们能帮你什么吗？我们在这里为您服务！',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true,
        },
        {
          textContent: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?Hey John, I am looking for the best admin template. Could you please help me to find it out?Hey John, I am looking for the best admin template. Could you please help me to find it out?Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'It should be Bootstrap 4 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true,
        },
        {
          textContent: 'Modern admin is the responsive bootstrap 4 admin template.!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true,
        },
        {
          textContent: 'Looks clean and fresh UI.',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'It\'s perfect for my next project.',
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'Thanks, from ThemeForest.',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true,
        },
        {
          textContent: 'I will purchase it for sure.',
          time: 'Mon Dec 10 2018 07:47:00 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'Thanks',
          time: 'Mon Dec 10 2018 07:47:05 GMT+0000 (GMT)',
          isSent: false,
          isSeen: false,
        },
      ],
    },
    2: {
      isPinned: true,
      msg: [
        {
          textContent: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true,
        },
        {
          textContent: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true,
        },
        {
          textContent: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true,
        },
        {
          textContent: 'Thank You',
          time: 'Mon Dec 11 2018 07:46:20 GMT+0000 (GMT)',
          isSent: true,
          isSeen: false,
        },
      ],
    },
  },
  showChatbox: false, // 是否显示聊天框
}

const mutations = {
  SET_CONTACT_LIST(state, contactList) {
    state.contactList = contactList
  },

  SEND_CHAT_MESSAGE(state, payload) {
    if (payload.chatData) {
      state.chats[Object.keys(state.chats).find(key => key === payload.id)].msg.push(payload.msg)
    } else {
      const chatId = payload.id
      Vue.set(state.chats, [chatId], { isPinned: payload.isPinned, msg: [payload.msg] })
    }
  },

  SET_CHAT_OPEN(state) {
    state.showChatbox = true
  },

  SET_CHAT_CLOSE(state) {
    state.showChatbox = false
  },

  MARK_SEEN_ALL_MESSAGES(state, payload) {
    payload.chatData.msg.forEach((msg) => {
      msg.isSeen = true
    })
  },
}

const actions = {
  async getContactList({ commit }) {
    const { code, data } = await getContactList()
    if (code === 2000) {
      commit('SET_CONTACT_LIST', data.contact_list)
    }
  },

  sendChatMessage({ getters, commit }, payload) {
    payload.chatData = getters.chatDataOfUser(payload.id)
    console.log(getters.chatDataOfUser(payload.id))
    commit('SEND_CHAT_MESSAGE', payload)
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
    chatDataOfUser: state => id => state.chats[Object.keys(state.chats).find(key => key === id)],

    getContactList: (state, getters) => {
      const chatArray = state.contactList.filter((contact) => {
        if (getters.chatDataOfUser(contact.id)) {
          return (
            contact.nickname.toLowerCase().includes(state.chatSearchQuery.toLowerCase())
            && (getters.chatDataOfUser(contact.id).msg.length > 0)
          )
        }
        return []
      })
      return chatArray
        .sort((x, y) => {
          const timeX = getters.chatLastMessaged(x.id).time
          const timeY = getters.chatLastMessaged(y.id).time
          return (new Date(timeY) - new Date(timeX))
        })
        .sort((x, y) => {
          const chatDataX = getters.chatDataOfUser(x.id)
          const chatDataY = getters.chatDataOfUser(y.id)
          return (chatDataY.isPinned - chatDataX.isPinned)
        })
    },

    chatLastMessaged: (state, getters) => (id) => {
      if (getters.chatDataOfUser(id)) {
        return getters.chatDataOfUser(id).msg.slice(-1)[0]
      }
      return false
    },

    chatUnseenMessages: (state, getters) => (id) => {
      let unseenMsg = 0
      const chatData = getters.chatDataOfUser(id)
      if (chatData) {
        chatData.msg.map((msg) => {
          if (!msg.isSeen && !msg.isSent) {
            unseenMsg += 1
          }
          return ''
        })
      }
      return unseenMsg
    },
  },
}
