<template>
  <div class="nav-wrapper">
    <div class="nav-bar">
      <!-- 导航栏左侧 -->
      <div class="flex items-center">
        <img
          src="@/assets/images/logo.png"
          class="mr-8 w-12"
          alt="LOGO"
        >
        <router-link
          v-for="(item, index) in navIcons"
          :key="index"
          :to="item.route"
        >
          <el-tooltip
            :open-delay="100"
            :content="item.tip"
            effect="light"
          >
            <i
              class="nav-icon mr-3"
              :class="item.icon"
            ></i>
          </el-tooltip>
        </router-link>
      </div>

      <!-- 导航栏右侧 -->
      <div class="flex items-center">
        <div class="flex items-center">
          <!-- 搜索图标 -->
          <el-tooltip
            :open-delay="100"
            :content="showSearchInput ? '关闭搜索' : '全站搜索'"
            effect="light"
          >
            <i
              class="nav-icon ml-3"
              :class="[showSearchInput ? 'el-icon-close' : 'el-icon-search']"
              @click="showSearchInput = !showSearchInput"
            ></i>
          </el-tooltip>
          <vs-input
            class="nav-search overflow-hidden"
            :class="[showSearchInput ? 'w-48': 'w-0']"
            placeholder="搜索你想要的宝贝"
            @keyup.esc="showSearchInput = false"
            @keyup.enter="search"
            v-model="searchText"
          />

          <!-- 全屏图标 -->
          <el-tooltip
            :open-delay="100"
            content="切换全屏"
            effect="light"
          >
            <i
              class="nav-icon mx-3"
              :class="[isFullScreen ? 'el-icon-crop' : 'el-icon-full-screen']"
              @click="screenfull"
            ></i>
          </el-tooltip>

          <!-- 购物车图标 -->
          <Cart class="mr-3" />

          <!-- 通知图标 -->
          <Notice class="mr-2" />
        </div>

        <template v-if="$login()">
          <!-- 用户名称 -->
          <div class="ml-3 text-right">
            <div class="text-lg">{{ info.nickname }}</div>
            <small style="color: #919191;">{{ info.school }}</small>
          </div>

          <!-- 头像 -->
          <vs-dropdown
            class="ml-4"
            vs-custom-content
          >
            <div class="flex items-center justify-center">
              <vs-avatar
                size="40px"
                :src="info.avatar_url"
              />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item
                class="w-32"
                v-for="(pop, index) in popItems"
                :key="index"
              >
                <router-link
                  tag="div"
                  class="flex items-center"
                  :to="pop.route || ''"
                  @click.native="!pop.route && signOut()"
                >
                  <i
                    class="inner-icon text-base font-medium"
                    :class="pop.icon"
                  ></i>
                  <span class="inner-text ml-3">{{ pop.text }}</span>
                </router-link>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </template>
        <template v-else>
          <div class="ml-3 text-right">
            <div class="text-right text-lg">您好</div>
            <small style="color: #919191;">请登录</small>
          </div>
          <vs-avatar
            text="Login"
            size="40px"
            @click="$router.push('/sign')"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import screenfull from 'screenfull'
import Cart from './the-navbar/Cart.vue'
import Notice from './the-navbar/Notice.vue'

const popItems = [
  { icon: 'el-icon-user', text: '个人中心', route: '/user-center' },
  { icon: 'el-icon-message', text: '我的消息', route: '/message' },
  { icon: 'el-icon-switch-button', text: '退出登录' },
]
const navIcons = [
  { tip: '首页', icon: 'el-icon-house', route: '/home' },
]

export default {
  name: 'TheNavbar',
  data: () => ({
    popItems,
    navIcons,
    searchText: '',
    showSearchInput: false,
    isFullScreen: false, // 是否全屏,
  }),

  components: { Cart, Notice },

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

  computed: {
    ...mapState('user', ['info']),
  },

  methods: {
    // 退出登录
    async signOut() {
      await this.$store.dispatch('user/signOut')
      this.$router.replace('/sign')
    },

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

<style lang="scss">
$navIcon: #686868; // 顶部导航栏图标颜色

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 0.6rem 1rem;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  .nav-icon {
    cursor: pointer;
    font-size: 22px;
    font-weight: 500;
    color: $navIcon;
  }
}

// 搜索框
.nav-search {
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
