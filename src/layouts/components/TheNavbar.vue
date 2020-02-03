<template>
  <div class="nav-wrapper">
    <div class="nav-bar">
      <!-- 导航栏左侧 -->
      <div class="flex items-center">
        <img
          class="ml-2 mr-8 w-12 cursor-pointer"
          src="@/assets/images/logo.png"
          alt="LOGO"
          @click="$router.push('/')"
        >
        <template v-if="$login()">
          <router-link
            v-login
            tag="div"
            class="mr-3"
            v-for="(item, index) in navIcons"
            :key="index"
            :to="item.route"
          >
            <el-tooltip
              effect="light"
              :open-delay="100"
              :content="item.tip"
            >
              <i
                class="nav-icon"
                :class="item.icon"
              ></i>
            </el-tooltip>
          </router-link>
          <el-tooltip content="在线聊">
            <feather
              class="nav-icon mr-3 mb-1"
              type="message-square"
              @click="$store.state.chat.showChatbox
              ? $store.commit('chat/SET_CHAT_CLOSE')
              : $store.commit('chat/SET_CHAT_OPEN')"
            ></feather>
          </el-tooltip>
        </template>
      </div>

      <!-- 导航栏右侧 -->
      <div class="flex items-center">
        <div class="flex items-center">
          <!-- 头像信息 -->
          <Avatar
            v-if="$login()"
            class="mx-3"
          />

          <!-- 搜索图标 -->
          <el-tooltip :content="showSearchInput ? '关闭搜索' : '全站搜索'">
            <feather
              class="nav-icon ml-3"
              :type="showSearchInput ? 'x' : 'search'"
              @click="showSearchInput = !showSearchInput"
            ></feather>
          </el-tooltip>
          <vs-input
            class="nav-search overflow-hidden"
            :class="showSearchInput ? 'w-48': 'w-0'"
            placeholder="搜索你想要的宝贝"
            @keyup.esc="showSearchInput = false"
            @keyup.enter="search"
            v-model="searchText"
          />

          <!-- 全屏图标 -->
          <el-tooltip :content="isFullScreen ? '退出全屏' : '进入全屏'">
            <feather
              class="nav-icon mx-3"
              :type="isFullScreen ? 'minimize' : 'maximize'"
              @click="screenfull"
            ></feather>
          </el-tooltip>
        </div>

        <template v-if="$login()">
          <!-- 购物车图标 -->
          <Cart class="mr-3" />

          <!-- 通知图标 -->
          <Notice />
        </template>
        <template v-else>
          <vs-button
            class="mx-3"
            size="small"
            type="line"
            @click="$router.push({ path: '/sign', query: { sign: 'signIn' } })"
          >
            登 录
          </vs-button>
          <vs-button
            size="small"
            type="relief"
            @click="$router.push({ path: '/sign', query: { sign: 'signUp' } })"
          >
            注 册
          </vs-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import screenfull from 'screenfull'

const Avatar = Vue.component(
  'Avatar',
  () => import('./the-navbar/Avatar.vue'),
)
const Cart = Vue.component(
  'Cart',
  () => import('./the-navbar/Cart.vue'),
)
const Notice = Vue.component(
  'Notice',
  () => import('./the-navbar/Notice.vue'),
)
const navIcons = [
  { tip: '发布我的闲置', icon: 'el-icon-sell', route: '/goods-addition' },
]

export default {
  name: 'TheNavbar',
  components: { Avatar, Cart, Notice },

  data: () => ({
    navIcons,
    searchText: '',
    showSearchInput: false, // 显示搜索框
    isFullScreen: false, // 是否全屏,
  }),

  mounted() {
    if (screenfull.enabled) {
      screenfull.on('change', this.screenChange)
    }
  },

  beforeDestroy() {
    if (screenfull.enabled) {
      screenfull.off('change', this.screenChange)
    }
  },

  methods: {
    // 网页全屏
    screenfull() {
      if (!screenfull.enabled) {
        this.$vs.notify({
          time: 3000,
          title: '不支持全屏',
          text: '检测到您的浏览器不支持全屏，请开启全屏显示模式',
          color: 'warning',
        })
        return
      }
      screenfull.toggle()
    },
    screenChange() {
      this.isFullScreen = screenfull.isFullscreen
    },

    // 搜索
    search() {
      console.log(this.searchText)
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-bar::v-deep {
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 4rem;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  .nav-icon {
    font-size: 1.5rem;
    color: $navIcon;
    cursor: pointer;
  }
}

// 搜索框
.nav-search::v-deep {
  // 重设输入框样式
  .vs-inputx {
    border: none !important;
    border-bottom: 2px solid #a0a0a0 !important;
    box-shadow: none;
    border-radius: 0;
    &.vs-input--input:focus {
      border: none !important;
      border-bottom: 2px solid #a0a0a0 !important;
    }
  }
}
</style>

<style lang="scss">
// 通知菜单
.vs-dropdown-menu.menu-box {
  width: 365px;

  .vs-dropdown--menu {
    padding: 0 !important;
    border: 0;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .vs-dropdown--menu--after {
    background: rgba(var(--vs-primary), 1);
  }
  .notice-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #989898;
  }
}
</style>
