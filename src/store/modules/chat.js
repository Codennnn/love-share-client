const state = {
  chats: {
    1: {
      isPinned: true,
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
      isPinned: false,
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
}

const getters = {
  chatDataOfUser: state => id => state.chats[Object.keys(state.chats).find(key => key === id)],
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
