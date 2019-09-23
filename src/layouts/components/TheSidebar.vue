<template>
  <div class="menu-main">
    <!-- 顶部LOGO -->
    <div
      class="logo sticky top-0 left-0 z-50 w-full flex items-center h-16 cursor-pointer"
      :class="{ 'logo-collapse': sidebarCollapse }"
      @click="switchCollapse"
    >
      <img
        class="w-6 h-6"
        src="@/assets/images/logo/logo.png"
      />
      <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        mode="out-in"
      >
        <img
          class="w-32 ml-3"
          src="@/assets/images/logo/logo-text.png"
          v-show="!sidebarCollapse"
        >
      </transition>
    </div>

    <el-menu
      router
      class="wrapper"
      :default-active="$route.path"
      :class="{ 'side-bar-menu': !sidebarCollapse }"
      :collapse="sidebarCollapse"
    >
      <!-- 菜单主内容 -->
      <template v-for="(menuItem,index) in sidebarList">
        <template v-if="!menuItem.hidden">
          <!-- 嵌套子菜单 -->
          <el-submenu
            v-if="menuItem.children && !menuItem.single"
            :key="index"
            :index="index.toString()"
          >
            <template slot="title">
              <i
                class="menu-icon iconfont"
                :class="menuItem.meta.icon"
              ></i>
              <span slot="title">{{ menuItem.meta.title }}</span>
            </template>
            <el-menu-item-group
              v-for="(subItem, index, key) in menuItem.children"
              :key="key"
            >
              <el-menu-item :index="subItem.path">{{ subItem.meta.title }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 单个菜单项 -->
          <el-menu-item
            v-else-if="menuItem.children && menuItem.single"
            :key="index"
            :index="menuItem.children[0].path"
          >
            <i
              class="menu-icon iconfont"
              :class="menuItem.children[0].meta.icon"
            ></i>
            <span slot="title">{{ menuItem.children[0].meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce' // 引入防抖函数

export default {
  data() {
    return {
    }
  },

  mounted() {
    window.onresize = _debounce(() => {
      if (document.body.clientWidth <= 1300) {
        this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', true)
      } else {
        this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', false)
      }
    }, 400)
  },

  computed: {
    sidebarCollapse() {
      return this.$store.state.sidebarCollapse
    },
    sidebarList() {
      return this.$store.state.permission.routes
    },
  },

  methods: {
    switchCollapse() {
      this.$store.commit(
        'SWITCH_SIDEBAR_COLLAPSE',
        !this.sidebarCollapse,
      )
    },
  },
}
</script>

<style lang="scss" scoped>
$hoverColor: #f0f0f0; // 导航菜单 hover 时的背景色

.menu-main {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}

.logo {
  width: $side-bar-width;
  padding: 0 36px;
  background: #fff;
  box-shadow: 0 15px 20px #fff;
  overflow: hidden;
  transition: all 0.5s;
  &.logo-collapse {
    width: 64px;
    padding: 0 18px;
  }
}

.el-menu.wrapper {
  max-width: $side-bar-width;
  border-right: none;
  &:not(.el-menu--collapse) {
    // 必须设置，否则会出现动画卡顿问题
    width: $side-bar-width;
  }
  &.side-bar-menu {
    padding: 0 18px;
  }
}

.el-submenu {
  margin-bottom: 10px;
  .el-submenu__title {
    &:hover {
      border-radius: 5px;
      background-color: $hoverColor;
    }
    .menu-icon {
      margin-right: 10px;
      font-size: 22px;
      font-weight: normal;
      color: $menuIcon;
    }
  }
  .el-menu-item-group {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      &:hover {
        border-radius: 5px;
        background-color: $hoverColor;
      }
    }
  }
}

.el-menu-item {
  line-height: 40px;
  height: 40px;
  &:hover {
    border-radius: 5px;
    background-color: $hoverColor;
  }
  .menu-icon {
    margin-right: 15px;
    font-size: 22px;
    font-weight: normal;
    color: $menuIcon;
  }
}

.el-menu-item.is-active {
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(var(--vs-primary), 1);
  background: linear-gradient(
    to right,
    rgba(var(--vs-primary), 1),
    rgba(var(--vs-primary), 0.7)
  );
  .menu-icon {
    color: inherit;
  }
}
</style>
