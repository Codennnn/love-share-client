<template>
  <div
    id="chat-app"
    class="relative border border-solid shadow-xl overflow-hidden"
    style="border-color: #dae1e7; border-radius: 1rem;"
  >
    <vs-sidebar
      id="chat-list-sidebar"
      parent="#chat-app"
      v-model="isChatSidebarActive"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
    >
      <div class="flex items-center px-4 py-3">
        <div class="relative inline-flex">
          <vs-avatar
            class="m-0"
            size="40px"
            :src="'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4'"
          />
        </div>
        <vs-input
          icon-no-border
          class="w-full mx-5"
          placeholder="搜索或新建聊天"
          icon="el-icon-search"
          icon-pack="el-icon"
        />
      </div>
      <vs-divider class="m-0" />

      <VuePerfectScrollbar
        class="chat-scroll-area pt-4"
        :settings="{
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        }"
      >
        <div class="chat__chats-list mb-8">
          <h3 class="text-primary mb-5 px-4">联系人</h3>
          <ul class="chat__active-chats bordered-items">
            <li
              class="cursor-pointer"
              v-for="(contact, i) in sorted"
              :key="i"
              @click="updateActiveChatUser(contact.id)"
            >
              <ChatContact
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact.id).time"
                :unseenMsg="chatUnseenMessages(contact.id)"
                :isActiveChatUser="isActiveChatUser(contact.id)"
              />
            </li>
          </ul>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>

    <!-- 右侧 -->
    <div
      class="chat-bg relative"
      :class="{'sidebar-spacer--wide': clickNotClose}"
    >
      <div class="chat-navbar ">
        <ChatNavbar
          :isSidebarCollapsed="!clickNotClose"
          :user-id="activeChatUser"
          :isPinnedProp="isChatPinned"
          @openContactsSidebar="toggleChatSidebar(true)"
        />
      </div>

      <!-- 聊天内容 -->
      <VuePerfectScrollbar
        ref="chatLogPS"
        class="chat-content-scroll-area"
        :settings="{
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        }"
      >
        <div ref="chatLog">
          <ChatLog :userID="'1'" />
        </div>
      </VuePerfectScrollbar>

      <!-- 输入框 -->
      <div class="chat-input flex items-center p-4 bg-white">
        <vs-input
          class="flex-1"
          placeholder="输入您的消息..."
          v-model="message"
          @keyup.enter="sendMessage()"
        />
        <vs-button
          class="bg-primary-gradient ml-4 text-sm"
          @click="sendMessage()"
        >发 送</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatContact from './components/ChatContact.vue'
import ChatNavbar from './components/ChatNavbar.vue'
import ChatLog from './components/ChatLog.vue'

export default {
  name: 'chat',
  components: {
    VuePerfectScrollbar,
    ChatContact,
    ChatNavbar,
    ChatLog,
  },

  data: () => ({
    clickNotClose: true,
    isChatSidebarActive: true,

    message: '',
    isChatPinned: false,
    activeChatUser: '1', // 当前聊天的用户
    windowWidth: window.innerWidth,
  }),

  mounted() {
    this.$store.dispatch('chat/getContactList')

    window.onresize = _debounce(() => {
      if (document.body.clientWidth <= 1000) {
        this.setSidebarActive(false)
      } else {
        this.setSidebarActive(true)
      }
    }, 400)
  },

  beforeDestroy() {
    window.onresize = null
  },

  computed: {
    chats() {
      console.log('=== chats ===', this.$store.getters['chat/chats'])
      return this.$store.getters['chat/chats']
    },
    sorted() {
      return this.chats.slice().sort((x, y) => {
        const xId = x.id
        const yId = y.id
        const chatDataX = this.$store.getters['chat/chatDataOfUser'](xId)
        const chatDataY = this.$store.getters['chat/chatDataOfUser'](yId)
        return (chatDataY.isPinned - chatDataX.isPinned)
      })
    },
    chatLastMessaged() {
      return userID => this.$store.getters['chat/chatLastMessaged'](userID)
    },
    chatUnseenMessages() {
      return (userID) => {
        const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](userID)
        if (unseenMsg) {
          return unseenMsg
        }
        return 0
      }
    },
    isActiveChatUser() {
      return userID => userID === this.activeChatUser
    },
  },

  methods: {
    updateActiveChatUser(contactId) {
      this.activeChatUser = contactId
      if (this.$store.getters['chat/chatDataOfUser'](this.activeChatUser)) {
        this.$store.dispatch('chat/markSeenAllMessages', contactId)
      }
      const chatData = this.$store.getters['chat/chatDataOfUser'](this.activeChatUser)
      if (chatData) this.isChatPinned = chatData.isPinned
      else this.isChatPinned = false
      this.toggleChatSidebar()
      this.message = ''
    },

    sendMessage() {
      if (this.message.length <= 0) return
      const payload = {
        isPinned: this.isChatPinned,
        msg: {
          textContent: this.message,
          time: String(new Date()),
          isSent: true,
          isSeen: false,
        },
        id: this.activeChatUser,
      }
      this.$store.dispatch('chat/sendChatMessage', payload)
      this.message = ''
      this.$nextTick(() => {
        // 发送消息后聊天框滚动到底部
        this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
      })
    },

    toggleChatSidebar(value = false) {
      if (!value && this.clickNotClose) {
        return
      }
      this.isChatSidebarActive = value
    },

    setSidebarActive(flag) {
      if (flag) {
        this.clickNotClose = true
        this.isChatSidebarActive = true
      } else {
        this.clickNotClose = false
        this.isChatSidebarActive = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$sidebar-width: 310px;

#chat-app::v-deep {
  #chat-list-sidebar,
  #chat-profile-sidebar {
    .vs-sidebar {
      max-width: $sidebar-width;
      border-right: 1px solid #dae1e7;
    }
    .vs-sidebar--items {
      height: 100%;
      padding: 0;
      overflow: hidden;
    }
    .vs-con-input {
      .vs-inputx {
        border-radius: 20px;
      }
      .vs-icon {
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
    }
  }

  #chat-list-sidebar {
    .chat-scroll-area {
      position: relative;
      margin: auto;
      width: 100%;
      height: calc(100% - 64px);
      .chat__contact {
        transition: background-color 0.1s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .chat-bg {
    background: rgb(231, 238, 255);
  }

  .sidebar-spacer--wide {
    width: calc(100% - #{$sidebar-width});
    margin-left: $sidebar-width;
  }
}

.chat-navbar {
  position: relative;
  width: 100%;
  z-index: 999;
}
.chat-content-scroll-area {
  top: 0;
  margin: auto;
  width: 100%;
  height: calc(100vh - 350px);
}
.chat-input {
  position: relative;
  width: 100%;
}
</style>

<style lang="scss">
#chat-app {
  // 给头像加白色边框
  .con-vs-avatar {
    .con-img.vs-avatar--con-img {
      border: 2px solid white;
    }
  }
}
</style>
