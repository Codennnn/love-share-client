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
                v-contextmenu:contextmenu
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact._id)"
                :isActiveChatUser="isActiveChatUser(contact._id)"
              />
              <v-contextmenu
                ref="contextmenu"
                theme="bright"
                @contextmenu="(e) => deleteContactId = e.componentOptions.propsData.contact._id"
              >
                <v-contextmenu-item @click="deleteContact()">删除联系人</v-contextmenu-item>
              </v-contextmenu>
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
          <ChatLog :contactId="activeChatUser" />
        </div>
      </VuePerfectScrollbar>

      <!-- 输入框 -->
      <div
        v-if="activeChatUser"
        class="chat-input flex items-center px-4 py-3 bg-white"
      >
        <vs-dropdown
          class="mr-2"
          vs-trigger-click
          vs-custom-content
        >
          <div class="py-2 px-3 bg-gray-150 rounded-lg">
            😊
          </div>
          <vs-dropdown-menu>
            <VEmojiPicker
              labelSearch="搜索..."
              @select="onSelectEmoji"
            />
          </vs-dropdown-menu>
        </vs-dropdown>
        <div class="message relative flex-1 rounded-lg overflow-hidden bg-gray-150">
          <vs-input
            class="type-input w-full"
            placeholder="输入您的消息..."
            v-model="message"
            @keyup.enter="sendMessage()"
          />
          <div
            class="absolute top-0 right-0 w-12 h-full ml-4 flex-row-center
             bg-primary-gradient text-white text-sm cursor-pointer"
            @click="sendMessage()"
          >
            发 送
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import { mapState } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatContact from './components/ChatContact.vue'
import ChatNavbar from './components/ChatNavbar.vue'
import ChatLog from './components/ChatLog.vue'

export default {
  name: 'Chat',
  components: {
    VEmojiPicker,
    VuePerfectScrollbar,
    ChatContact,
    ChatNavbar,
    ChatLog,
  },

  data: () => ({
    // 侧边栏是否激活
    clickNotClose: true,
    isChatSidebarActive: true,

    deleteContactId: '',
    chatSearch: '', // 搜索聊天
    message: '', // 要发送的消息
  }),

  created() {
    this.$store.dispatch('chat/initChat')
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
    ...mapState('chat', ['activeChatUser', 'activeChatNickname']),
    userId() {
      return this.$store.getters['user/userId']
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

    onSelectEmoji(emoji) {
      console.log(emoji.data)
      this.message += emoji.data
    },

    async sendMessage() {
      if (this.message.length <= 0) return

      const message = {
        type: 'text', // 消息类型
        msg: this.message, // 消息内容
        is_sent: true, // 是否为发送方
        is_seen: false, // 是否已读
        client: this.userId, // 自己的 ID
        target: this.activeChatUser, // 对方的 ID
        time: Date.now(),
      }
      await this.$socket.emit('sendMessage', message)
      this.$store.commit('chat/SEND_CHAT_MESSAGE', message)
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

    deleteContact() {
      this.$store.dispatch('chat/deleteContact', this.deleteContactId)
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

  // 给头像加白色边框
  .con-vs-avatar {
    .con-img.vs-avatar--con-img {
      border: 2px solid white;
    }
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

.message .type-input::v-deep {
  .vs-inputx {
    border: none !important;
    box-shadow: none;
    background: transparent;
    padding-right: 3rem;
  }
  .input-span-placeholder {
    padding-right: 3rem;
  }
}
</style>

<style lang="scss">
.v-contextmenu {
  z-index: 9999999;
  padding: 0;
  border: none;
  overflow: hidden;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(var(--vs-danger), 1);
  }
  .v-contextmenu-item {
    padding: 12px 14px;
    transition: all 0.2s;
  }
  .v-contextmenu-item--hover {
    background-color: rgba(var(--vs-danger), 0.95);
  }
}
</style>
