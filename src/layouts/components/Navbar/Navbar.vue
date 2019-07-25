<template>
  <div class="nav-wrapper">
    <div class="nav-bar flex justify-between items-center bg-white rounded-lg">
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
          <!-- 切换语言图标 -->
          <vs-dropdown>
            <i
              class="nav-icon iconfont"
              :class="`icon-${this.$i18n.locale}`"
            ></i>
            <vs-dropdown-menu>
              <vs-dropdown-item
                v-for="(item, index) in languages"
                :key="index"
                @click="switchLanguage(item.key)"
              >
                {{ item.text }}
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          <!-- 通知图标 -->
          <el-badge>
            <i
              class="nav-icon iconfont"
              :class="'icon-notice'"
            ></i>
          </el-badge>
          <!-- 全屏图标 -->
          <i
            class="nav-icon iconfont ml-3"
            :class="[isFullScreen ? 'icon-screenunfull' : 'icon-screenfull' ]"
            @click="screenfull"
          ></i>
        </div>
        <div class="info">
          <div class="text-right text-lg">陈梓聪</div>
          <small>新媒体工作部</small>
        </div>
        <el-popover
          class="popover flex items-center p-0 ml-5"
          transition="el-zoom-in-bottom"
        >
          <ul>
            <router-link
              class="popover-item flex items-center"
              tag="li"
              v-for="(pop, index) in popItems"
              :to="pop.route || ''"
              :key="index"
              @click.native="!pop.route && logout()"
            >
              <i
                class="inner-icon text-base font-medium"
                :class="pop.icon"
              ></i>
              <div class="inner-text ml-3">{{ pop.text }}</div>
            </router-link>
          </ul>
          <img
            class="avatar cursor-pointer"
            slot="reference"
            src="@/assets/images/avatar.jpg"
          />
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'NavBar',
  data() {
    return {
      popItems: [
        { icon: 'el-icon-user', text: '我的信息', route: '/' },
        { icon: 'el-icon-trophy', text: '我的社团', route: '/my-club' },
        { icon: 'el-icon-switch-button', text: '退出登录' },
      ],
      navIcons: [
        { tip: '社团', icon: 'icon-medal', route: '/club-list' },
        { tip: '动态', icon: 'icon-dynamic', route: '/dynamic-list' },
        { tip: '活动', icon: 'icon-activity', route: '/activity-list' },
      ],
      languages: [
        { text: '简体中文', key: 'cn' },
        { text: 'English', key: 'en' },
      ],
      isFullScreen: false,
    };
  },

  mounted() {
    if (screenfull.enabled) {
      screenfull.on('change', this.screenChange);
    }
  },

  beforeDestroy() {
    if (screenfull.enabled) {
      screenfull.off('change', this.screenChange);
    }
  },

  methods: {
    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.replace('/login');
    },
    // 切换语言
    switchLanguage(key) {
      this.$i18n.locale = key;
    },

    // 网页全屏
    screenfull() {
      if (!screenfull.enabled) {
        this.$vs.notify({
          time: 3000,
          title: '不支持全屏',
          text: '检测到您的浏览器不支持全屏，请开启全屏显示模式',
          color: 'warning',
        });
        return;
      }
      screenfull.toggle();
    },
    screenChange() {
      this.isFullScreen = screenfull.isFullscreen;
    },
  },
};
</script>

<style lang="scss">
.nav-bar {
  height: 70px;
  padding: 10px 20px;
  box-shadow: $baseShadow;
  .nav-icon {
    &:hover {
      cursor: pointer;
    }
    font-size: 25px;
    font-weight: 500;
    color: $navIcon;
  }
}

.nav-right {
  display: flex;
  align-items: center;
}

.info {
  margin-left: 15px;
  text-align: right;
  small {
    color: #919191;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 8px #686868;
  overflow: hidden;
}

.popover-item {
  padding: 8px 10px;
  color: #686868;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    background-color: rgba($primary, 0.9);
  }
}
</style>
