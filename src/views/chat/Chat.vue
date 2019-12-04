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
      :click-not-close="true"
      :hidden-background="clickNotClose"
    >
      <div class="flex items-center px-4 py-3">
        <div class="relative inline-flex">
          <vs-avatar
            class="m-0"
            size="40px"
            :src="`${$store.state.user.info.avatar_url}?imageView2/2/w/60`"
          />
        </div>
        <vs-input
          icon-no-border
          class="w-full mx-5"
          placeholder="搜索或新建聊天"
          icon="el-icon-search"
          icon-pack="el-icon"
          v-model="chatSearch"
        />
        <i
          class="el-icon-d-arrow-left text-xl text-gray-700 cursor-pointer"
          v-if="!clickNotClose"
          @click.stop="isChatSidebarActive = false"
        ></i>
      </div>
      <vs-divider class="m-0" />

      <VuePerfectScrollbar
        class="chat-scroll-area"
        :settings="{
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        }"
      >
        <div class="chat__chats-list mb-8">
          <ul
            v-if="contactList.length > 0"
            class="chat__active-chats bordered-items"
          >
            <li
              class="cursor-pointer"
              v-for="(contact, i) in contactList"
              :key="i"
              @click="updateActiveChatUser(contact)"
            >
              <ChatContact
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact._id)"
                :isActiveChatUser="isActiveChatUser(contact._id)"
              />
            </li>
          </ul>
          <div
            v-else
            class="h-full py-40 flex flex-col items-center justify-center text-gray-500"
          >
            <i class="el-icon-chat-dot-round mb-4 text-4xl"></i>
            <p class="text-sm">暂无联系人</p>
          </div>
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
          :nickname="activeChatNickname"
          :isSidebarCollapsed="!clickNotClose"
          @openContactsSidebar="isChatSidebarActive = true"
        />
      </div>

      <!-- 聊天内容 -->
      <VuePerfectScrollbar
        ref="chatLogPS"
        class="chat-content-scroll-area"
        style="min-width: 400px;"
        :settings="{
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        }"
      >
        <div ref="chatLog">
          <ChatLog
            :contactId="activeChatUser"
            :avatar="activeChatAvatar"
          />
        </div>
      </VuePerfectScrollbar>

      <!-- 输入框 -->
      <div
        v-if="activeChatUser"
        class="chat-input flex items-center p-4 bg-white"
      >
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
import { mapState } from 'vuex'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatContact from './components/ChatContact.vue'
import ChatNavbar from './components/ChatNavbar.vue'
import ChatLog from './components/ChatLog.vue'

export default {
  name: 'Chat',
  components: {
    VuePerfectScrollbar,
    ChatContact,
    ChatNavbar,
    ChatLog,
  },

  data: () => ({
    // 侧边栏是否激活
    clickNotClose: true,
    isChatSidebarActive: true,

    chatSearch: '', // 搜索聊天
    message: '', // 要发送的消息
  }),

  created() {
    // this.$store.dispatch('chat/getContactList')
    // this.$store.dispatch('chat/getChatData')
  },

  mounted() {
    window.onresize = _debounce(() => {
      if (document.body.clientWidth <= 1000) {
        this.setSidebarActive(false)
      } else {
        this.setSidebarActive(true)
      }
    }, 400)

    // 监听自身 ID， 订阅消息
    this.sockets.subscribe(this.userId, (msg) => {
      this.$store.dispatch('chat/receiveMessage', msg)
    })
  },

  beforeDestroy() {
    window.onresize = null
  },

  computed: {
    ...mapState('chat', ['activeChatUser', 'activeChatNickname', 'activeChatAvatar']),
    userId() {
      return this.$store.getters['user/getUserId']
    },
    // 全部联系人
    contactList() {
      return this.$store.getters['chat/getContactList']
    },
    // 最后一条发送的消息
    chatLastMessaged() {
      return contactId => this.$store.getters['chat/chatLastMessaged'](contactId)
    },
    // 没读的消息条数
    chatUnseenMessages() {
      return (contactId) => {
        const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](contactId)
        if (unseenMsg) {
          return unseenMsg
        }
        return 0
      }
    },
    // 当前打开的聊天
    isActiveChatUser() {
      return contactId => contactId === this.activeChatUser
    },
  },

  methods: {
    updateActiveChatUser({ _id, nickname, avatar_url }) {
      this.$store.commit('chat/SET_ACTIVE_CHAT_USER', { _id, nickname, avatar_url })
      this.$store.dispatch('chat/markSeenAllMessages', _id)
      this.message = ''
      this.$nextTick(() => {
        this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
      })
    },

    sendMessage() {
      if (this.message.length <= 0) return

      const message = {
        is_sent: true,
        type: 'text',
        msg: this.message,
        client: this.userId,
        target: this.activeChatUser,
        time: Date.now(),
      }
      this.$socket.emit('sendMessage', message)
      this.$store.dispatch('chat/sendChatMessage', message)
      this.message = ''
      this.$nextTick(() => {
        // 发送消息后聊天框滚动到底部
        this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
      })
    },

    setSidebarActive(active) {
      if (active) {
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
    .vs-sidebar--background {
      position: absolute;
      background: rgba(0, 0, 0, 0.1);
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
