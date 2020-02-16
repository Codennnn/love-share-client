<template>
  <div id="layout-main">
    <div id="content-area">
      <!-- 头部 -->
      <TheNavbar id="the-navbar" />

      <div id="router-view">
        <div class="router-content">
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
          <!-- <br>
          <br>
          <br>
          <br> -->
        </div>
      </div>
      <!-- 页脚 -->
      <TheFooter class="router-footer" />
    </div>

    <!-- 在线聊天 -->
    <template v-if="$login()">
      <VueDragResize
        ref="drag"
        class="fixed cursor-pointer"
        :isActive="false"
        :isResizable="false"
        :w="50"
        :h="50"
        :x="30"
        :y="500"
        :z="99999999"
        :parentLimitation="true"
        @mousedown.native="mousedown"
        @mouseup.native="mouseup"
      >
        <div
          class="w-12 h-12 flex-row-center bg-primary-gradient radius"
          style="box-shadow: 0 0 15px rgba(var(--vs-primary), 0.8);"
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
        <div
          id="chat-container"
          v-show="showChatbox"
        >
          <Chat />
        </div>
      </transition>
    </template>

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
#layout-main {
  position: relative;
  width: 100%;
  min-width: $layout-min-width;
}

#content-area {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#the-navbar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  min-width: $layout-min-width;
  box-sizing: border-box;
}

#router-view {
  position: relative;
  padding-bottom: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - #{$footer-height});
  @media (max-width: $router-view-max-width) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .router-content {
    padding-top: 6.5rem;
    width: 1100px;
  }
}

#chat-container {
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 9999;
}
</style>
