<template>
  <div class="relative">
    <div
      class="nav-wrapper"
      :class="{ collapse: sidebarCollapse }"
    >
      <div class="nav-bar rounded-lg">
        <div>
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
                class="nav-icon iconfont mr-3"
                :class="item.icon"
              ></i>
            </el-tooltip>
          </router-link>
        </div>
        <div class="nav-right">
          <div class="flex items-center">
            <!-- 搜索图标 -->
            <el-tooltip
              :open-delay="100"
              :content="showSearchInput ? '关闭搜索' : '全站搜索'"
              effect="light"
            >
              <i
                class="nav-icon iconfont ml-3"
                :class="[showSearchInput ? 'icon-close' : 'icon-search']"
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
                class="nav-icon iconfont mx-3"
                :class="[isFullScreen ? 'icon-screenunfull' : 'icon-screenfull']"
                @click="screenfull"
              ></i>
            </el-tooltip>
            <!-- 通知图标 -->
            <vs-dropdown
              vs-custom-content
              vs-trigger-click
            >
              <el-badge
                class="mr-2"
                :value="2"
              >
                <i
                  class="nav-icon iconfont"
                  :class="'icon-notice'"
                ></i>
              </el-badge>
              <vs-dropdown-menu class="notice-box">
                <div class="flex items-center justify-center
                text-white bg-primary p-4 text-xl">5 条新消息</div>
                <VuePerfectScrollbar
                  style="height: 350px;"
                  ref="mainSidebarPs"
                  :settings="settings"
                >
                  <ul
                    v-for="(notice, i) in notices"
                    :key="i"
                  >
                    <li class="notice flex justify-between px-4 py-4
                    cursor-pointer hover:bg-gray-200">
                      <div class="flex items-start">
                        <vs-icon
                          icon="chat_bubble_outline"
                          size="small"
                          color="primary"
                        ></vs-icon>
                        <div class="mx-2">
                          <div>
                            <span class="text-primary font-medium block">{{ notice.title }}</span>
                            <small class="notice-content">{{ notice.msg }}</small>
                          </div>
                        </div>
                      </div>
                      <small
                        class="whitespace-no-wrap"
                        style="color: #989898;"
                      >{{ $dayjs().format('YYYY') }}</small>
                    </li>
                  </ul>
                </VuePerfectScrollbar>
                <div class="w-full p-2 text-center text-primary
                cursor-pointer font-semibold bg-gray-100">
                  <span>查看全部通知</span>
                </div>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <!-- 用户名称 -->
          <div class="info">
            <div class="text-right text-lg">{{ nickname }}</div>
            <small style="color: #919191;">新媒体工作部</small>
          </div>

          <!-- 头像 -->
          <vs-dropdown
            class="ml-4"
            vs-custom-content
          >
            <img
              class="avatar cursor-pointer rounded-full w-10 h-10 overflow-hidden"
              src="@/assets/images/avatar.jpg"
            />
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
                  @click.native="!pop.route && logout()"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { mapState } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const popItems = [
  { icon: 'el-icon-user', text: '我的信息', route: '/' },
  { icon: 'el-icon-trophy', text: '我的社团', route: '/my-club' },
  { icon: 'el-icon-switch-button', text: '退出登录' },
]
const navIcons = [
  { tip: '社团', icon: 'icon-medal', route: '/club-list' },
  { tip: '动态', icon: 'icon-dynamic', route: '/dynamic-list' },
  { tip: '活动', icon: 'icon-activity', route: '/activity-list' },
]
const notices = [
  { title: '优惠券即将到期', msg: '您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用您有一张八折优惠券即将到期，请及时使用', type: 0 },
]

export default {
  name: 'TheNavBar',
  data: () => ({
    popItems,
    navIcons,
    notices,
    searchText: '',
    showSearchInput: false,
    isFullScreen: false, // 是否全屏,
    settings: {
      maxScrollbarLength: 160,
      wheelSpeed: 0.60,
    },
  }),

  components: { VuePerfectScrollbar },

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
    ...mapState(['sidebarCollapse']),
    ...mapState('user', ['nickname']),
  },

  methods: {
    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.replace('/login')
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

    search() {
      console.log(this.searchText)
    },
  },
}
</script>

<style lang="scss">
.nav-wrapper {
  position: fixed;
  z-index: 999;
  width: calc(100% - #{$side-bar-width});
  min-width: 900px;
  padding: 1.4rem;
  padding-top: 1.2rem;
  box-sizing: border-box;
  transition: width 0.5s;
  &.collapse {
    width: calc(100% - #{$side-bar-width} + 178px);
  }
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 0.6rem 1rem;
  background: #fff;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  .nav-icon {
    &:hover {
      cursor: pointer;
    }
    font-size: 22px;
    font-weight: 500;
    color: $navIcon;
  }
}

.nav-right {
  display: flex;
  align-items: center;
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
.vs-dropdown-menu.notice-box {
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

.info {
  margin-left: 15px;
  text-align: right;
}

// 用户头像
.avatar {
  box-shadow: 0 0 8px #777777;
}
</style>
