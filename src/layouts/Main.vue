<template>
  <div id="layout-main">
    <div id="content-area">
      <!-- 头部 -->
      <TheNavbar id="the-navbar" />

      <div id="router-view">
        <div class="router-content pt-24">
          <!-- 主区域 -->
          <transition
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"
            mode="out-in"
          >
            <keep-alive
              :include="alivePages"
              :max="5"
            >
              <router-view />
            </keep-alive>
          </transition>
        </div>

        <!-- 页脚 -->
        <TheFooter class="router-footer" />
      </div>

      <!-- 在线聊天 -->
      <VueDragResize
        :isActive="false"
        :isResizable="false"
        class=" cursor-pointer"
        :w="50"
        :h="50"
        :x="10"
        :y="820"
        :z="99999999"
        @mousedown.native="mousedown"
        @mouseup.native="mouseup"
      >
        <div
          class="w-12 h-12 flex-row-center bg-primary-gradient rounded-lg"
          style="left: 30px; bottom: 30px; box-shadow: 0 0 10px rgba(var(--vs-primary), 1);"
        >
          <feather
            class="text-white"
            type="message-square"
          ></feather>
        </div>
      </VueDragResize>
      <transition
        enter-active-class="animated zoomIn quickly"
        leave-active-class="animated zoomOutLeft faster"
        mode="out-in"
      >
        <template v-if="$login()">
          <div
            id="chat-container"
            v-show="showChatbox"
          >
            <Chat />
          </div>
        </template>
      </transition>

      <!-- 回到顶部按钮 -->
      <BackToTop
        bottom="5%"
        visibleoffset="500"
      >
        <vs-button
          icon="arrow_upward"
          class="shadow-lg"
        />
      </BackToTop>
    </div>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import BackToTop from 'vue-backtotop'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import Chat from '@/views/chat/Chat.vue'

export default {
  name: 'Main',
  components: {
    VueDragResize,
    TheNavbar,
    TheFooter,
    BackToTop,
    Chat,
  },

  sockets: {
    connect() {
      this.$socket.emit('setOnline')
    },
  },

  data: () => ({
    alivePages: ['Home', 'UserCenter', 'GoodsCart', 'GoodsDetail', 'GoodsSchoolList'], // 允许缓存的路由
    mouseDownPos: {},
  }),

  computed: {
    showChatbox() {
      return this.$store.state.chat.showChatbox
    },
  },

  methods: {
    mousedown({ x, y }) {
      this.mouseDownPos = { x, y }
    },
    mouseup({ x: x2, y: y2 }) {
      const { x, y } = this.mouseDownPos
      const sqrt = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2))
      // 如果小于等于 5，则认为是点击事件而非拖拽事件
      if (sqrt <= 5) {
        this.$store.commit('chat/SET_CHAT_OPEN')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$footer-height: 65px !global;

#layout-main {
  position: relative;
  width: 100%;
  min-width: 900px;
  padding: 0 30px;
  background: rgb(248, 248, 248);
}

#content-area {
  position: relative;
  display: flex;
  justify-content: center;
}

#the-navbar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  min-width: 900px;
  box-sizing: border-box;
}

#router-view {
  position: relative;
  min-height: 100vh;
  width: 1200px;
  @media (max-width: 1260px) {
    min-width: 100%;
  }
  .router-content {
    min-height: calc(100vh - #{$footer-height});
  }
  .router-footer {
    height: $footer-height;
    line-height: $footer-height;
  }
}

#chat-container {
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 9999;
}
</style>
