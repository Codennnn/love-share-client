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
                :value="this.notices.length > 0 ? this.notices.length : ''"
                @click="getNotices"
              >
                <i
                  class="nav-icon iconfont"
                  :class="'icon-notice'"
                ></i>
              </el-badge>
              <vs-dropdown-menu
                id="div-with-loading"
                class="notice-box"
              >
                <div
                  class="w-full table text-center text-white bg-primary cursor-pointer"
                  style="height: 65px;"
                  @mouseover="showRefresh = true"
                  @mouseout="showRefresh = false"
                >
                  <div
                    class="table-cell"
                    style="vertical-align: middle;"
                    @click="noticesRefresh"
                  >
                    <div class="text-xl">收到 {{ this.notices.length }} 条新通知</div>
                    <div
                      class="text-sm text-gray-300"
                      v-show="showRefresh"
                    >点击刷新</div>
                  </div>
                </div>
                <VuePerfectScrollbar
                  style="height: 350px;"
                  :settings="settings"
                >
                  <ul
                    class="vs-con-loading__container"
                    v-if="this.notices.length > 0"
                  >
                    <li
                      class="notice flex justify-between px-4 py-4
                    cursor-pointer hover:bg-gray-200"
                      style="transition: all 0.3s;"
                      v-for="(nt, i) in notices"
                      :key="i"
                    >
                      <div class="flex items-start">
                        <vs-icon
                          size="small"
                          :icon="noticeType[nt.type].icon"
                          :color="noticeType[nt.type].color"
                        ></vs-icon>
                        <div class="mx-2">
                          <div>
                            <span
                              class="font-medium block"
                              :class="[`text-${noticeType[nt.type].color}`]"
                            >{{ nt.title }}</span>
                            <small class="notice-content">{{ nt.content }}</small>
                          </div>
                        </div>
                      </div>
                      <small
                        class="whitespace-no-wrap"
                        style="color: #989898;"
                      >{{ timeDiff(nt.time) }}</small>
                    </li>
                  </ul>
                  <div
                    class="h-full flex flex-col items-center justify-center"
                    v-else
                  >
                    <vs-icon
                      size="80px"
                      icon="blur_on"
                      color="#718096"
                    ></vs-icon>
                    <div class="mt-4 text-gray-600 text-sm">暂无更多新的通知</div>
                  </div>
                </VuePerfectScrollbar>
                <div
                  class="w-full p-2 text-center text-primary
                cursor-pointer font-semibold bg-gray-100 hover:bg-gray-200"
                  style="transition: all 0.3s;"
                >
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

import { timeDiff } from '@/utils/util'
import { getNotices } from '@/request/api/notice'

const popItems = [
  { icon: 'el-icon-user', text: '个人中心', route: '/profile' },
  { icon: 'el-icon-message', text: '我的消息', route: '/my-club' },
  { icon: 'el-icon-switch-button', text: '退出登录' },
]
const navIcons = [
  { tip: '商品', icon: 'icon-activity', route: '/goods-list' },
  { tip: '订单', icon: 'icon-dynamic', route: '/order-list' },
  { tip: '用户', icon: 'icon-group', route: '/user-list' },
]
const noticeType = {
  0: { icon: 'chat_bubble_outline', color: 'primary' },
  1: { icon: 'done_outline', color: 'success' },
  2: { icon: 'help_outline', color: 'warning' },
  3: { icon: 'error_outline', color: 'danger' },
}

export default {
  name: 'TheNavBar',
  data: () => ({
    timeDiff,
    popItems,
    navIcons,
    notices: [],
    noticeType,
    showRefresh: false,
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
    this.getNotices()
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
    // timeDiff(time), // 计算通知的时间差

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

    // 搜索
    search() {
      console.log(this.searchText)
    },

    // 获取通知
    async getNotices() {
      try {
        const { code, data } = await getNotices()
        if (code === 2000) {
          this.notices = data.notices
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 刷新通知
    async noticesRefresh() {
      this.$vs.loading({
        type: 'point',
        container: '#div-with-loading',
        scale: 1,
      })
      await this.getNotices()
      this.$vs.loading.close('#div-with-loading > .con-vs-loading')
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
